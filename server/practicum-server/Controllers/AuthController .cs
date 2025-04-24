using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Service.Services;

namespace practicum_server.Controllers
{
    public class AuthController : Controller
    {
        private readonly ClientService _clientService;

        public AuthController(ClientService clientService)
        {
            _clientService = clientService;
        }

        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        //{
        //    var client = await _clientService.Register(request.Name, request.Email, request.Password);

        //    // כעת ניתן לגשת לתכונות של client כמו Email
        //    return Ok(new
        //    {
        //        Message = "User registered successfully",
        //        Client = new
        //        {
        //            Email = client.Email
        //        }
        //    });
        //}

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDto request)
        {
            var token = _clientService.Login(request.Email, request.Password);
            if (token == null)
            {
                return Unauthorized(new { Message = "Invalid credentials" });
            }

            return Ok(new { Token = token });
        }
    }
}


