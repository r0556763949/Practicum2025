using Microsoft.AspNetCore.Mvc;
using Practicum.Core.DTOs;
using Practicum.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace practicum_server.Controllers
{

    [Route("api/clients/{clientId}/projects")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;
        public ProjectController(ProjectService projectService)
        {
            _projectService = projectService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateProject(int clientId, [FromBody] CreateProjectDto projectDto)
        {
            try
            {
                // קריאה לשירות ליצירת פרויקט
                var newProject = await _projectService.CreateProjectAsync(clientId, projectDto.Description, projectDto.Address, projectDto.StartAt);

                // יצירת תשובה עם ה-ProjectDto
                return CreatedAtAction(nameof(GetProject), new { clientId, projectId = newProject.Id }, newProject);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // עדכון המתודה GetProject כך שתשיב DTO
        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetProject(int clientId, int projectId)
        {
            try
            {
                // קריאה לשירות לקבלת פרויקט
                var project = await _projectService.GetProjectAsync(clientId, projectId);

                // החזרת ה-ProjectDto
                return Ok(project);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetProjectsByClientId(int clientId)
        {
            try
            {
                // קריאה לשירות לקבלת פרויקטים עבור לקוח
                var projects = await _projectService.GetProjectsByClientIdAsync(clientId);

                // החזרת רשימת ה-ProjectDto
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpDelete("{projectId}")]
        public async Task<IActionResult> DeleteProject(int clientId, int projectId)
        {
            try
            {
                // קריאה לשירות כדי למחוק את הפרויקט
                await _projectService.DeleteProjectAsync(clientId, projectId);

                // החזרת תשובה עם מצב 204 No Content
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Project with ID {projectId} not found.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
