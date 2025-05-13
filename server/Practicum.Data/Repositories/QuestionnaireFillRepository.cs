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

        public async Task<QuestionnaireFill> AddAsync(QuestionnaireFill entity)
        {
            _context.QuestionnaireFills.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<QuestionnaireFill?> GetByIdAsync(int id)
        {
            return await _context.QuestionnaireFills.FindAsync(id);
        }

        public async Task<IEnumerable<QuestionnaireFill>> GetAllAsync()
        {
            return await _context.QuestionnaireFills.ToListAsync();
        }

        public async Task UpdateAsync(QuestionnaireFill entity)
        {
            _context.QuestionnaireFills.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.QuestionnaireFills.FindAsync(id);
            if (entity != null)
            {
                _context.QuestionnaireFills.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
