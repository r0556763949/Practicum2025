using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Create(QuestionnaireFill fill)
        {
            await _service.AddAsync(fill);
            return CreatedAtAction(nameof(GetById), new { id = fill.Id }, fill);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, QuestionnaireFill fill)
        {
            if (id != fill.Id)
                return BadRequest();
            await _service.UpdateAsync(fill);
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
