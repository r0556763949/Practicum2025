using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Service.Services;

namespace practicum_server.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : Controller
    {
        private readonly ClientService _clientService;

       public AuthController(ClientService clientService)
        {
            _clientService = clientService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            try
            {
                var token = await _clientService.Login(request.Email, request.Password);
                if (token == null)
                {
                    return Unauthorized(new { message = "כתובת מייל או סיסמה שגויים" });
                }

                return Ok(new { token });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login Error: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "אירעה שגיאה פנימית בשרת" });
            }
        }

    }
}


