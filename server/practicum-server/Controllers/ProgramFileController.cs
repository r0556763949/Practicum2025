using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Service;
using Practicum.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace practicum_server.Controllers
{
    
    [Route("api/clients/{clientId}/projects/{projectId}/files")]
    [ApiController]
    public class ProgramFileController : ControllerBase
    {
        private readonly ProgramFileService _programFileService;
        private readonly DiffService _diffService;
        public ProgramFileController(ProgramFileService programFileService, DiffService diffService)
        {
            _programFileService = programFileService;
            _diffService = diffService;
        }
        [HttpPost("upload-url")]
        public async Task<IActionResult> GetUploadUrl(int clientId, int projectId, [FromBody] string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("File name is required.");
            }

            var (uploadUrl, filePath) = await _programFileService.CreateFileAsync(clientId, projectId, name);

            if (uploadUrl == null)
            {
                return StatusCode(500, "Failed to generate upload URL.");
            }

            return Ok(new { UploadUrl = uploadUrl, FilePath = filePath });
        }

        [Authorize(Roles = "Manager")]
        [HttpPost("confirm-upload")]
        public async Task<IActionResult> ConfirmUpload(int clientId, int projectId, [FromBody] FileUploadRequestDto request)
        {
            if (string.IsNullOrEmpty(request.FileName) || string.IsNullOrEmpty(request.FilePath))
            {
                return BadRequest("File name and path are required.");
            }

            var file = await _programFileService.ConfirmUploadAsync(clientId, projectId, request.FileName, request.Description, request.FilePath);

            if (file == null)
            {
                return StatusCode(500, "Failed to confirm file upload.");
            }

            return Ok(file);
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
        /// </summary
        /// 
        [Authorize(Roles = "Manager")]
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

        /// <summary>
        /// קבלת מזהה המשתמש של הקובץ לפי מזהה הקובץ
        /// </summary>
        [HttpGet("{id}/owner")]
        public async Task<IActionResult> GetFileOwner( int id)
        {
            var ownerId = await _programFileService.GetFileOwnerIdAsync(id);

            if (ownerId == null)
            {
                return NotFound("File not found or owner ID could not be retrieved.");
            }

            return Ok(new { OwnerId = ownerId });
        }

        [HttpGet("compare-plans/{idFile1}/{idFile2}")]
        public async Task<IActionResult> ComparePlansAsync(string idFile1, string idFile2)
        {

            if (!int.TryParse(idFile1, out var fileId1) || !int.TryParse(idFile2, out var fileId2))
                return BadRequest("Invalid file IDs");

            var path1 = await _programFileService.GetFilePathAsync(fileId1);
            var path2 = await _programFileService.GetFilePathAsync(fileId2);

            if (string.IsNullOrEmpty(path1) || string.IsNullOrEmpty(path2))
                return NotFound("One or both files not found");

            var diffImagePath = await _diffService.CompareTwoPlansAsync(path1, path2);

            // קריאת התמונה המושוות
            var diffImageBytes = await System.IO.File.ReadAllBytesAsync(diffImagePath);

            // מחזירים את התמונה המושוות ללקוח
            return File(diffImageBytes, "image/png");
        }
    }
}
