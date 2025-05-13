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
using Google.Apis.Services;
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

        public QuestionnaireFillService(IQuestionnaireFillRepository questionnaireFillRepository, IMapper mapper, IClientRepository clientRepository, IQuestionnaireRepository _questionnaireRepository)
        {
            _questionnaireFillRepository = questionnaireFillRepository;
            _mapper = mapper;
            _clientRepository = clientRepository;
            _questionnaireRepository = _questionnaireRepository;
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
            await _questionnaireFillRepository.DeleteAsync(id);
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

            var headerRow = values[0];
            int emailColumnIndex = headerRow.FindIndex(col => col.ToString().Trim().Contains("מייל"));
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
