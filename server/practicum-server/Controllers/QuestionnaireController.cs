using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        public async Task<IActionResult> Create(Questionnaire questionnaire)
        {
            await _service.AddAsync(questionnaire);
            return CreatedAtAction(nameof(GetById), new { id = questionnaire.Id }, questionnaire);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Questionnaire questionnaire)
        {
            if (id != questionnaire.Id)
                return BadRequest();
            await _service.UpdateAsync(questionnaire);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
