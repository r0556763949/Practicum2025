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
    public class QuestionnaireFillRepository : IQuestionnaireFillRepository
    {
        private readonly DataContext _context;
        public QuestionnaireFillRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<QuestionnaireFill>> GetAllAsync()
        {
            return await _context.QuestionnaireFills
                .Include(q => q.Questionnaire)
                .Include(q => q.Client)
                .ToListAsync();
        }

        public async Task<QuestionnaireFill> GetByIdAsync(int id)
        {
            return await _context.QuestionnaireFills
                .Include(q => q.Questionnaire)
                .Include(q => q.Client)
                .FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task AddAsync(QuestionnaireFill questionnaireFill)
        {
            await _context.QuestionnaireFills.AddAsync(questionnaireFill);
        }

        public void Update(QuestionnaireFill questionnaireFill)
        {
            _context.QuestionnaireFills.Update(questionnaireFill);
        }

        public void Delete(QuestionnaireFill questionnaireFill)
        {
            _context.QuestionnaireFills.Remove(questionnaireFill);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
