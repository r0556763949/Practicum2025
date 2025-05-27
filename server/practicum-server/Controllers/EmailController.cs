
using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Service.Services;


namespace practicum_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;
        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }
        [HttpPost("ContactForm")]
        public async Task<IActionResult> SendContactForm([FromBody] ContactFormDto form)
        {
            try
            {
                _emailService.SendContactForm(form);
                return Ok(new { message = "הטופס נשלח בהצלחה" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "אירעה שגיאה בעת שליחת הטופס. אנא נסה שוב מאוחר יותר." });
            }
        }
        [HttpPost("SendEmail")]
        public async Task<IActionResult> SendEmailToClient([FromBody] SendEmailDto email)
        {
            try
            {
                _emailService.SendEmailToClient(email.ClientId, email.Subject, email.Message);
                return Ok(new { message = "הטופס נשלח בהצלחה" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "אירעה שגיאה בעת שליחת הטופס. אנא נסה שוב מאוחר יותר." });
            }
        }
    }
}
