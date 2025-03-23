using Microsoft.EntityFrameworkCore;
using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Data.Repositories
{
    public class ProjectRepository: IProjectRepository
    {
        private readonly DataContext _context;
        public ProjectRepository(DataContext context) 
        { 
            _context = context; 
        }
        public async Task<Client> GetClientByIdAsync(int clientId)
        {
            return await _context.Clients
                .Include(c => c.Projects)
                .FirstOrDefaultAsync(c => c.Id == clientId);
        }

        public async Task<Project> GetProjectByIdAsync(int projectId, int clientId)
        {
            return await _context.Projects
                .FirstOrDefaultAsync(p => p.Id == projectId && p.Client.Id == clientId);
        }
        public async Task<List<Project>> GetProjectsByClientIdAsync(int clientId)
        {
            return await _context.Projects
                .Where(p => p.Client.Id == clientId)
                .ToListAsync();
        }

        public async Task AddProjectAsync(Project project)
        {
            await _context.Projects.AddAsync(project);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
