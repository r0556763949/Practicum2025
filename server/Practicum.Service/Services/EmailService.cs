using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Service.Services
{
    public class EmailService
    {
        private readonly string _fromAddress;
        private readonly string _fromName;
        private readonly string _appPassword;

        public EmailService()
        {
            _fromAddress = Environment.GetEnvironmentVariable("EMAIL_ADDRESS");
            _fromName = Environment.GetEnvironmentVariable("EMAIL_NAME") ?? "Architect App";
            _appPassword = Environment.GetEnvironmentVariable("EMAIL_PASSWORD");
        }
        public async Task SendWelcomeEmail(string email, string name, string password)
        {
            var from = new MailAddress(_fromAddress, _fromName);
            var toAddress = new MailAddress(email, name);
            const string subject = "ברוך הבא לאתר!";
            string body = $"שלום {name},\n\nנרשמת בהצלחה.\nמייל: {email}  \n  סיסמה: {password}   \n\nבהצלחה!";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_fromAddress, _appPassword)
            };

            using var message = new MailMessage(from, toAddress)
            {
                Subject = subject,
                Body = body
            };

            await smtp.SendMailAsync(message);
        }

    }
}
