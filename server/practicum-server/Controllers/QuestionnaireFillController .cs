using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Core.Models;
using Practicum.Service.Services;

namespace practicum_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionnaireFillController : ControllerBase
    {
        private readonly QuestionnaireFillService _service;

        public QuestionnaireFillController(QuestionnaireFillService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] QuestionnaireFillCreateDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpPut("summarize/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] int clientId )
        {
            await _service.UpdateAsync(id, clientId);
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
