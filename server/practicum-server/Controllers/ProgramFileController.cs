using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Service;
using Practicum.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace practicum_server.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/clients/{clientId}/projects/{projectId}/files")]
    [ApiController]
    public class ProgramFileController : ControllerBase
    {
        private readonly ProgramFileService _programFileService;
        public ProgramFileController(ProgramFileService programFileService)
        {
            _programFileService = programFileService;
        }
        /// <summary>
        /// יצירת קובץ וקבלת ניתוב להעלאה
        /// </summary>
        [HttpPost("upload-url")]
        public async Task<IActionResult> GetUploadUrl(int clientId, int projectId, [FromBody] FileUploadRequestDto request)
        {
            if (string.IsNullOrEmpty(request.FileName))
            {
                return BadRequest("File name is required.");
            }

            var (uploadUrl, file) = await _programFileService.CreateFileAsync(clientId, projectId, request.FileName, request.Description);

            if (uploadUrl == null)
            {
                return StatusCode(500, "Failed to generate upload URL.");
            }

            return Ok(new
            {
                UploadUrl = uploadUrl,
                FileId = file.Id,
                FilePath = file.Path
            });
        }

        /// <summary>
        /// קבלת רשימה של קבצים בפרויקט עבור לקוח
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Get(int clientId, int projectId)
        {
            var files = await _programFileService.GetFilesAsync(clientId, projectId);
            return Ok(files);
        }

        /// <summary>
        /// מחיקת קובץ
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int clientId, int projectId, int id)
        {
            var result = await _programFileService.DeleteFileAsync(clientId, projectId, id);
            if (!result)
            {
                return NotFound("File not found.");
            }
            return NoContent();
        }
        /// <summary>
        /// הורדת קובץ
        /// </summary>
        [HttpGet("{id}/download")]
        public async Task<IActionResult> DownloadFile(int clientId, int projectId, int id)
        {
            string downloadUrl = await _programFileService.GetDownloadUrlAsync(id);
            if (string.IsNullOrEmpty(downloadUrl))
            {
                return NotFound("File not found or unable to generate download URL.");
            }

            return Ok(new { DownloadUrl = downloadUrl });
        }

        /// <summary>
        /// צפייה בקובץ
        /// </summary>
        [HttpGet("{id}/view")]
        public async Task<IActionResult> ViewFile(int clientId, int projectId, int id)
        {
            string viewUrl = await _programFileService.GetViewUrlAsync(id);
            if (string.IsNullOrEmpty(viewUrl))
            {
                return NotFound("File not found or unable to generate view URL.");
            }

            return Ok(new { ViewUrl = viewUrl });
        }


    }
}
