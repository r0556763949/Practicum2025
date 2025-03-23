using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.IRepositories
{
    public interface IProjectRepository
    {
        Task<Client> GetClientByIdAsync(int clientId);
        Task<Project> GetProjectByIdAsync(int projectId, int clientId);
        Task AddProjectAsync(Project project);
        Task SaveChangesAsync();
    }
}
