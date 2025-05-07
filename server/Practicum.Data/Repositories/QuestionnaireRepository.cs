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
    public class QuestionnaireRepository: IQuestionnaireRepository
    {
        private readonly DataContext _context;
        public QuestionnaireRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Questionnaire>> GetAllAsync()
        {
            return await _context.Questionnaires.ToListAsync();
        }

        public async Task<Questionnaire> GetByIdAsync(int id)
        {
            return await _context.Questionnaires.FindAsync(id);
        }

        public async Task AddAsync(Questionnaire questionnaire)
        {
            await _context.Questionnaires.AddAsync(questionnaire);
        }

        public void Update(Questionnaire questionnaire)
        {
            _context.Questionnaires.Update(questionnaire);
        }

        public void Delete(Questionnaire questionnaire)
        {
            _context.Questionnaires.Remove(questionnaire);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
