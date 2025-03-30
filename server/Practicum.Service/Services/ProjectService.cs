using AutoMapper;
using Practicum.Core.DTOs;
using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Service.Services
{
    public class ProjectService
    {
        private readonly IProjectRepository _ProjectRepository;
        private readonly IMapper _mapper;

        public ProjectService(IProjectRepository projectRepository, IMapper mapper)
        {
            _ProjectRepository = projectRepository;
            _mapper = mapper;
        }

        public async Task<ProjectDto> CreateProjectAsync(int clientId, string description, string address, DateOnly startAt)
        {
            // בדיקה אם הלקוח קיים
            var client = await _ProjectRepository.GetClientByIdAsync(clientId);
            if (client == null)
            {
                throw new Exception($"Client with ID {clientId} not found.");
            }

            // יצירת הפרויקט
            var newProject = new Project
            {
                Description = description,
                Address = address,
                StartAt = startAt,
                Client = client
            };

            // שמירת הפרויקט במסד הנתונים
            await _ProjectRepository.AddProjectAsync(newProject);
            await _ProjectRepository.SaveChangesAsync();

            var projectDto = _mapper.Map<ProjectDto>(newProject);
            return projectDto;
        }

        public async Task<ProjectDto> GetProjectAsync(int clientId, int projectId)
        {
            var project = await _ProjectRepository.GetProjectByIdAsync(projectId, clientId);
            if (project == null)
            {
                throw new Exception($"Project with ID {projectId} for Client ID {clientId} not found.");
            }
            var projectDto = _mapper.Map<ProjectDto>(project);
            return projectDto;

        }
        public async Task<List<ProjectDto>> GetProjectsByClientIdAsync(int clientId)
        {
            // בדיקה אם הלקוח קיים
            var client = await _ProjectRepository.GetClientByIdAsync(clientId);
            if (client == null)
            {
                throw new Exception($"Client with ID {clientId} not found.");
            }

            // קבלת כל הפרויקטים עבור הלקוח
            var projects = await _ProjectRepository.GetProjectsByClientIdAsync(clientId);

            // מיפוי ל-DTO
            var projectDtos = _mapper.Map<List<ProjectDto>>(projects);

            return projectDtos;
        }
        public async Task DeleteProjectAsync(int clientId, int projectId)
        {
            // לוגיקה למחיקת הפרויקט מהמאגר
            var project = await _ProjectRepository.GetByIdAsync(clientId, projectId);
            if (project == null)
            {
                throw new KeyNotFoundException();
            }

            await _ProjectRepository.DeleteAsync(project);
        }
    }
}
