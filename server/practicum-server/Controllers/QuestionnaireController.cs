using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Core.Models;
using Practicum.Service.Services;

namespace practicum_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionnaireController : ControllerBase
    {
        private readonly QuestionnaireService _service;

        public QuestionnaireController(QuestionnaireService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }
        [Authorize(Roles = "Manager")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] QuestionnaireCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var questionnaire = await _service.AddAsync(dto);
                return Ok(new { id = questionnaire.Id });
            }

            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the questionnaire.", detail = ex.Message });
            }
        }

        [Authorize(Roles = "Manager")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] QuestionnaireCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _service.UpdateAsync(id, dto);
            if (!success)
            {
                return NotFound(new { message = $"Questionnaire with ID {id} not found." });
            }

            return Ok(new { message = "Questionnaire updated successfully." }); // במקום NoContent עדיף להחזיר אישור ברור
        }

        [Authorize(Roles = "Manager")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success)
            {
                return NotFound(new { message = $"Questionnaire with ID {id} not found." });
            }

            return Ok(new { message = "Questionnaire deleted successfully." });
        }
    }
}
