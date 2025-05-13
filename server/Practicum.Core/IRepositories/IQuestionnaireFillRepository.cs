using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.IRepositories
{
    public interface IQuestionnaireFillRepository
    {
        Task<QuestionnaireFill> AddAsync(QuestionnaireFill entity);
        Task<QuestionnaireFill?> GetByIdAsync(int id);
        Task<IEnumerable<QuestionnaireFill>> GetAllAsync();
        Task UpdateAsync(QuestionnaireFill entity);
        Task DeleteAsync(int id);
    }
}
