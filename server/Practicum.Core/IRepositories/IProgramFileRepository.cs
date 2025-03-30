using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.IRepositories
{
    public interface IProgramFileRepository
    {
         Task AddAsync(ProgramFile file);
        Task UpdatePathAsync(int fileId, string path);
         Task<IEnumerable<ProgramFile>> GetFilesByClientAndProjectAsync(int clientId, int projectId);

        Task DeleteAsync(int fileId);

        Task<int?> GetFileOwnerIdAsync(int fileId);
        Task<ProgramFile> GetFileByIdAsync(int fileId);
    }
}
