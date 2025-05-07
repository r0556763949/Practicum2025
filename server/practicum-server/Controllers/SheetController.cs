using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Practicum.Service.Services;
using System.Text;

namespace practicum_server.Controllers
{
    [Route("api/")]
    [ApiController]
    public class SheetController : ControllerBase
    {
        [HttpGet("summarize/{sheetId}/{email}")]
        public async Task<IActionResult> Summarize(string sheetId, string email)
        {
            var googleCredentialsPath = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS_PATH");
            if (string.IsNullOrEmpty(googleCredentialsPath))
                throw new Exception("משתנה סביבה GOOGLE_APPLICATION_CREDENTIALS_PATH לא מוגדר!");

            if (!System.IO.File.Exists(googleCredentialsPath))
                throw new Exception($"הקובץ {googleCredentialsPath} לא נמצא!");

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

            var range = "תגובות לטופס 1!A1:Z"; // שימי את השם המדויק של הטאב בטבלת גוגל
            var request = service.Spreadsheets.Values.Get(sheetId, range);
            var response = await request.ExecuteAsync();
            var values = response.Values;

            if (values == null || values.Count == 0)
            {
                return Ok(new { summary = "לא נמצאו תשובות." });
            }

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
            Console.WriteLine("emailColumnIndex: " + emailColumnIndex);
            var targetRow = values
       .Skip(1) // מדלגים על הכותרות
       .FirstOrDefault(row => row.Count > emailColumnIndex && row[emailColumnIndex].ToString().Trim().Equals(email, StringComparison.OrdinalIgnoreCase));

            if (targetRow == null)
            {
                return Ok(new { summary = $"לא נמצאה תשובה עבור {email}." });
            }

            var summaryBuilder = new StringBuilder();
            for (int i = 0; i < headerRow.Count; i++)
            {
                string question = headerRow[i].ToString().Trim();
                string answer = (i < targetRow.Count) ? targetRow[i].ToString().Trim() : "";

                summaryBuilder.AppendLine($"שאלה: {question}");
                summaryBuilder.AppendLine($"תשובה: {answer}");
                summaryBuilder.AppendLine();
            }

            // נבנה את הפרומפט ל-AI
            var prompt = $@"הלקוח ענה על שאלון תכנון למטבח. 
אני שולחת לך את השאלות והתשובות שלו. 
בבקשה תסכם בצורה ברורה מה הלקוח מחפש, 
ותשים דגש על הסגנון העיצובי שהוא מעוניין בו. 
הנה השאלון והתשובות:

{summaryBuilder}";
            Console.WriteLine("prompt: "+ prompt);

            // שולחים ל-AI
            var aiService = new API_AI_Service();
            var aiSummary = await aiService.GetAiSummary(prompt);

            return Ok(new { summary = aiSummary });
        }
    }
}
