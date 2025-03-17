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
    public class RepositoryManager: IRepositoryManager
    {
        private readonly DataContext _context;
        public IClientRepository Clients { get; }
        public IProjectRepository Projects { get; }
        public IProgramFileRepository ProgramFiles { get;  }
        public IReMarkRepository ReMarks { get;  }

        public RepositoryManager(DataContext context, IClientRepository clients,
            IProjectRepository projects,
            IProgramFileRepository programFiles,
            IReMarkRepository reMarks)
        {
            _context = context;
            Clients = clients;
            Projects = projects;
            ProgramFiles = programFiles;
            ReMarks = reMarks;
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
