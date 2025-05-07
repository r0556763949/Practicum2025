using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Service.Services
{
    public class QuestionnaireService
    {
        private readonly IQuestionnaireRepository _questionnaireRepository;

        public QuestionnaireService(IQuestionnaireRepository questionnaireRepository)
        {
            _questionnaireRepository = questionnaireRepository;
        }

        public async Task<IEnumerable<Questionnaire>> GetAllAsync()
        {
            return await _questionnaireRepository.GetAllAsync();
        }

        public async Task<Questionnaire> GetByIdAsync(int id)
        {
            return await _questionnaireRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(Questionnaire questionnaire)
        {
            await _questionnaireRepository.AddAsync(questionnaire);
            await _questionnaireRepository.SaveChangesAsync();
        }

        public async Task UpdateAsync(Questionnaire questionnaire)
        {
            _questionnaireRepository.Update(questionnaire);
            await _questionnaireRepository.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var questionnaire = await _questionnaireRepository.GetByIdAsync(id);
            if (questionnaire != null)
            {
                _questionnaireRepository.Delete(questionnaire);
                await _questionnaireRepository.SaveChangesAsync();
            }
        }
    }
}
