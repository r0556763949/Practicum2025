using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using Amazon.S3.Model;


namespace Practicum.Service.Services
{
    public class API_AI_Service
    {
        private readonly string _apiKey;
        private readonly string _model;

        public API_AI_Service()
        {
             _apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
             _model = Environment.GetEnvironmentVariable("OPENAI_MODEL");
        }

        public async Task<string> GetAiSummary(string prompt)
        {

            Console.WriteLine("Environment.GetEnvironmentVariable");
            Console.WriteLine("OPENAI_API_KEY: " + _apiKey);
            Console.WriteLine("OPENAI_MODEL"+ _model);
            
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

                var requestBody = new
                {
                    model =  _model, 
                    messages = new[]
                    {
                new { role = "user", content = prompt }
            }
                };

                var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

                var response = await httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
                var responseString = await response.Content.ReadAsStringAsync();

                // שלב חשוב! הדפסה של מה שחוזר
                Console.WriteLine("AI RESPONSE: " + responseString);

                // בדיקה האם הצליח בכלל
                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception($"OpenAI API error: {response.StatusCode} - {responseString}");
                }

                // נסיון לפרש את התשובה
                dynamic result = JsonConvert.DeserializeObject(responseString);

                // בדיקה בטוחה של choices
                if (result?.choices != null && result.choices.Count > 0)
                {
                    var aiMessage = result.choices[0].message.content.ToString();
                    return aiMessage;
                }
                else
                {
                    throw new Exception("תשובה לא תקינה: אין choices בתוצאה.");
                }
            }
            }

        }       
}
