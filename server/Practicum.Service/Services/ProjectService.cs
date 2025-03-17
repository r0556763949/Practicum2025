using Practicum.Core.IRepositories;
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

        public ProjectService(IProjectRepository projectRepository)
        {
            _ProjectRepository = projectRepository;
        }
    }
}
