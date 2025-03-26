using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Core.Models;
using Practicum.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace practicum_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReMarkController : ControllerBase
    {
        private readonly ReMarkService _reMarkService;
        public ReMarkController(ReMarkService remarkService)
        {
            _reMarkService = remarkService;
        }

        [HttpGet("file/{fileId}")]
        public async Task<ActionResult> GetReMarksByFileId(int fileId)
        {
            var result = await _reMarkService.GetReMarksByFileId(fileId); // השתמש ב-await כאן
            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var result = _reMarkService.GetReMarkById(id);
            return Ok(result);
        }

        // 🔹 הוספת הערה לפי ID של קובץ
        [HttpPost("file/{fileId}")]
        public async Task<ActionResult<ReMarkDto>> Post(int fileId, [FromBody] AddReMarkDto value)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.Content))
            {
                return BadRequest("Content is required");
            }

            var result = await _reMarkService.AddReMark(fileId, value);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] string context)
        {
            var result = _reMarkService.UpdateReMark(id, context);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _reMarkService.DeleteReMark(id);
            return Ok();
        }
    }
}
