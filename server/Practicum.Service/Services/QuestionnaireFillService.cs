using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Service.Services
{
    public class QuestionnaireFillService
    {
        private readonly IQuestionnaireFillRepository _questionnaireFillRepository;

        public QuestionnaireFillService(IQuestionnaireFillRepository questionnaireFillRepository)
        {
            _questionnaireFillRepository = questionnaireFillRepository;
        }

        public async Task<IEnumerable<QuestionnaireFill>> GetAllAsync()
        {
            return await _questionnaireFillRepository.GetAllAsync();
        }

        public async Task<QuestionnaireFill> GetByIdAsync(int id)
        {
            return await _questionnaireFillRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(QuestionnaireFill questionnaireFill)
        {
            await _questionnaireFillRepository.AddAsync(questionnaireFill);
            await _questionnaireFillRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(QuestionnaireFill questionnaireFill)
        {
            _questionnaireFillRepository.Update(questionnaireFill);
            await _questionnaireFillRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var fill = await _questionnaireFillRepository.GetByIdAsync(id);
            if (fill != null)
            {
                _questionnaireFillRepository.Delete(fill);
                await _questionnaireFillRepository.SaveChangesAsync();
            }
        }
    }
}
