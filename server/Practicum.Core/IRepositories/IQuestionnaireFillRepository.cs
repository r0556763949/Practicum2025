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
        Task<IEnumerable<QuestionnaireFill>> GetAllAsync();
        Task<QuestionnaireFill> GetByIdAsync(int id);
        Task AddAsync(QuestionnaireFill questionnaireFill);
        void Update(QuestionnaireFill questionnaireFill);
        void Delete(QuestionnaireFill questionnaireFill);
        Task SaveChangesAsync();
    }
}
