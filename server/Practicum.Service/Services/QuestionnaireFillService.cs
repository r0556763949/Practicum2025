using AutoMapper;
using Practicum.Core.DTOs;
using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Services;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using System.Text;
using Google.Apis.Sheets.v4.Data;

namespace Practicum.Service.Services
{
    public class QuestionnaireFillService
    {
        private readonly IQuestionnaireFillRepository _questionnaireFillRepository;
        private readonly IMapper _mapper;
        private readonly IClientRepository _clientRepository;
        private readonly IQuestionnaireRepository _questionnaireRepository;

        public QuestionnaireFillService(IQuestionnaireFillRepository questionnaireFillRepository, IMapper mapper, IClientRepository clientRepository, IQuestionnaireRepository questionnaireRepository)
        {
            _questionnaireFillRepository = questionnaireFillRepository;
            _mapper = mapper;
            _clientRepository = clientRepository;
            _questionnaireRepository = questionnaireRepository;
        }

        public async Task<QuestionnaireFill> CreateAsync(QuestionnaireFillCreateDto dto)
        {
            var questionnaireFill = _mapper.Map<QuestionnaireFill>(dto);

            return await _questionnaireFillRepository.AddAsync(questionnaireFill);
        }

        public async Task<QuestionnaireFill?> GetByIdAsync(int id)
        {
            return await _questionnaireFillRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<QuestionnaireFill>> GetAllAsync()
        {
            return await _questionnaireFillRepository.GetAllAsync();
        }
        public async Task<IEnumerable<QuestionnaireFill>> GetByClientIdAsync(int clientId)
        {
            return await _questionnaireFillRepository.GetByClientIdAsync(clientId);
        }

        public async Task UpdateAsync(int id, int clientId)
        {
            var existing = await _questionnaireFillRepository.GetByIdAsync(id);
            if (existing == null) return;

            var client = await _clientRepository.GetByIdAsync(clientId);
            if (client == null || string.IsNullOrEmpty(client.Email))
                throw new Exception("לא נמצא מייל ללקוח.");
            var questionnaire = await _questionnaireRepository.GetByIdAsync(existing.QuestionnaireId);
            if (questionnaire == null)
                throw new Exception("לא נמצא SHEET.");

            var summaryDto = await SummarizeAsync(questionnaire.GoogleSheetId, client.Email);
            if (summaryDto == null)
                throw new Exception("לא ניתן היה להפיק סיכום מהשאלון.");

            existing.FilledAt = summaryDto.FilledAt;
            existing.RawSummary = summaryDto.RawSummary;
            existing.AiSummary = summaryDto.AiSummary;

            await _questionnaireFillRepository.UpdateAsync(existing);
        }

        public async Task DeleteAsync(int id)
        {
            var existing = await _questionnaireFillRepository.GetByIdAsync(id);
            if (existing == null) return;

            var client = await _clientRepository.GetByIdAsync(existing.Id);
            if (client == null || string.IsNullOrEmpty(client.Email))
                throw new Exception("לא נמצא מייל ללקוח.");

            var questionnaire = await _questionnaireRepository.GetByIdAsync(existing.QuestionnaireId);
            if (questionnaire == null)
                throw new Exception("לא נמצא SHEET.");

            await DeleteRowByEmailAsync(questionnaire.GoogleSheetId, client.Email);

            await _questionnaireFillRepository.DeleteAsync(id);
        }
        public async Task DeleteRowByEmailAsync(string sheetId, string email)
        {
            var googleCredentialsPath = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS_PATH");
            if (string.IsNullOrEmpty(googleCredentialsPath) || !System.IO.File.Exists(googleCredentialsPath))
                throw new Exception("קובץ הרשאות לא מוגדר או לא קיים.");

            GoogleCredential credential;
            using (var stream = new FileStream(googleCredentialsPath, FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream)
                    .CreateScoped(SheetsService.Scope.Spreadsheets);
            }

            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "Practicum2025"
            });

            var range = "תגובות לטופס 1!A1:Z";
            var request = service.Spreadsheets.Values.Get(sheetId, range);
            var response = await request.ExecuteAsync();
            var values = response.Values;

            if (values == null || values.Count == 0)
                return;

            var headerRow = values[0];
            int emailColumnIndex = -1;

            for (int i = 0; i < headerRow.Count; i++)
            {
                if (headerRow[i].ToString().Trim().Contains("מייל"))
                {
                    emailColumnIndex = i;
                    break;
                }
            }

            if (emailColumnIndex == -1)
                return;

            int rowIndexToDelete = -1;
            for (int i = 1; i < values.Count; i++)
            {
                var row = values[i];
                if (row.Count > emailColumnIndex &&
                    row[emailColumnIndex].ToString().Trim().Equals(email, StringComparison.OrdinalIgnoreCase))
                {
                    rowIndexToDelete = i;
                    break;
                }
            }

            if (rowIndexToDelete == -1)
                return;

            // בניית בקשת מחיקה
            var deleteRequest = new Request
            {
                DeleteDimension = new DeleteDimensionRequest
                {
                    Range = new DimensionRange
                    {
                        SheetId = 0, // אם יש לך Sheet ID אחר, צריך לשלוף אותו
                        Dimension = "ROWS",
                        StartIndex = rowIndexToDelete,
                        EndIndex = rowIndexToDelete + 1
                    }
                }
            };

            var batchUpdateRequest = new BatchUpdateSpreadsheetRequest
            {
                Requests = new List<Request> { deleteRequest }
            };

            await service.Spreadsheets.BatchUpdate(batchUpdateRequest, sheetId).ExecuteAsync();
        }

        public async Task<QuestionnaireFillUpdateDto?> SummarizeAsync(string sheetId, string email)
        {
            var googleCredentialsPath = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS_PATH");
            if (string.IsNullOrEmpty(googleCredentialsPath) || !System.IO.File.Exists(googleCredentialsPath))
                throw new Exception("קובץ הרשאות לא מוגדר או לא קיים.");

            GoogleCredential credential;
            using (var stream = new FileStream(googleCredentialsPath, FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream)
                    .CreateScoped(SheetsService.Scope.SpreadsheetsReadonly);
            }

            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "Practicum2025"
            });

            var range = "תגובות לטופס 1!A1:Z";
            var request = service.Spreadsheets.Values.Get(sheetId, range);
            var response = await request.ExecuteAsync();
            var values = response.Values;

            if (values == null || values.Count == 0)
                return null;


            // למצוא את עמודת המייל
            var headerRow = values[0]; // שורה ראשונה
            int emailColumnIndex = -1;
            for (int i = 0; i < headerRow.Count; i++)
            {
                if (headerRow[i].ToString().Trim().Contains("מייל")) // או שם הכותרת המדויקת
                {
                    emailColumnIndex = i;
                    break;
                }
            }
            if (emailColumnIndex == -1)
                return null;

            var targetRow = values
                .Skip(1)
                .FirstOrDefault(row => row.Count > emailColumnIndex &&
                    row[emailColumnIndex].ToString().Trim().Equals(email, StringComparison.OrdinalIgnoreCase));

            if (targetRow == null)
                return null;

            var summaryBuilder = new StringBuilder();
            for (int i = 0; i < headerRow.Count; i++)
            {
                string question = headerRow[i].ToString().Trim();
                string answer = (i < targetRow.Count) ? targetRow[i].ToString().Trim() : "";

                summaryBuilder.AppendLine($"שאלה: {question}");
                summaryBuilder.AppendLine($"תשובה: {answer}");
                summaryBuilder.AppendLine();
            }

            string rawSummary = summaryBuilder.ToString();
            var prompt = $@"הלקוח ענה על שאלון תכנון למטבח. 
אני שולחת לך את השאלות והתשובות שלו. 
בבקשה תסכם בצורה ברורה מה הלקוח מחפש, 
ותשים דגש על הסגנון העיצובי שהוא מעוניין בו. 
הנה השאלון והתשובות:

{summaryBuilder}";
            Console.WriteLine("prompt: " + prompt);

            var aiService = new APIAIService();
            string aiSummary = await aiService.GetAiSummary(prompt);

            return new QuestionnaireFillUpdateDto
            {
                FilledAt = DateTime.Now,
                RawSummary = rawSummary,
                AiSummary = aiSummary
            };
        }
    }
}
