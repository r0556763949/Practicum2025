using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Practicum.Core.DTOs;
using Practicum.Core.IRepositories;

namespace Practicum.Service.Services
{
    public class EmailService
    {
        private readonly string _ManagerAddress;
        private readonly string _ManagerName;
        private readonly string _appPassword;
        private readonly IClientRepository _clientRepository;
        public EmailService(IClientRepository clientRepository)
        {
            _ManagerAddress = Environment.GetEnvironmentVariable("EMAIL_ADDRESS");
            _ManagerName = Environment.GetEnvironmentVariable("EMAIL_NAME") ?? "Architect App";
            _appPassword = Environment.GetEnvironmentVariable("EMAIL_PASSWORD");
            _clientRepository = clientRepository;
        }
        private SmtpClient CreateSmtpClient()
        {
            return new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_ManagerAddress, _appPassword)
            };
        }
        public async Task SendWelcomeEmail(string email, string name, string password)
        {
            var from = new MailAddress(_ManagerAddress, _ManagerName);
            var toAddress = new MailAddress(email, name);
            const string subject = "ברוך הבא לאתר!";
            string body = $"שלום {name},\n\nנרשמת בהצלחה.\nמייל: {email}  \n  סיסמה: {password}   \n\nבהצלחה!";

            //var smtp = new SmtpClient
            //{
            //    Host = "smtp.gmail.com",
            //    Port = 587,
            //    EnableSsl = true,
            //    DeliveryMethod = SmtpDeliveryMethod.Network,
            //    UseDefaultCredentials = false,
            //    Credentials = new NetworkCredential(_ManagerAddress, _appPassword)
            //};

            using var message = new MailMessage(from, toAddress)
            {
                Subject = subject,
                Body = body
            };

            using var smtp = CreateSmtpClient();
            await smtp.SendMailAsync(message);
        }
        public async Task SendContactForm(ContactFormDto form)
        {
            try
            {
                var from = new MailAddress(_ManagerAddress, "טופס צור קשר");
                var to = new MailAddress(_ManagerAddress, _ManagerName);

                string subject = "פנייה חדשה מהאתר";
                string body = $"התקבלה פנייה חדשה מהאתר:\n\n" +
                              $"שם: {form.Name}\n" +
                              $"אימייל: {form.Email}\n" +
                              $"טלפון: {form.Phone}\n" +
                              $"הודעה:\n{form.Message}";

                using var message = new MailMessage(from, to)
                {
                    Subject = subject,
                    Body = body
                };
                using var smtp = CreateSmtpClient();
                await smtp.SendMailAsync(message);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("שליחת המייל נכשלה", ex);
            }
        }

        public async Task SendEmailToClient(int userId, string subject, string body)
        {

            var user = await _clientRepository.GetByIdAsync(userId);
            if (user == null || string.IsNullOrEmpty(user.Email))
            {
                throw new ArgumentException("לא נמצא משתמש עם מזהה זה או שאין לו אימייל");
            }

            var from = new MailAddress(_ManagerAddress, _ManagerName);
            var to = new MailAddress(user.Email, user.Name); // אפשר להחליף fullName לפי הצורך

            using var message = new MailMessage(from, to)
            {
                Subject = subject,
                Body = body
            };

            using var smtp = CreateSmtpClient();
            await smtp.SendMailAsync(message);
        }
    }
}
