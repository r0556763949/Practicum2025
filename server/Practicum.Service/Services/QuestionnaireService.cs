using AutoMapper;
using Practicum.Core.DTOs;
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
        private readonly IMapper _mapper;

        public QuestionnaireService(IQuestionnaireRepository questionnaireRepository, IMapper mapper)
        {
            _questionnaireRepository = questionnaireRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Questionnaire>> GetAllAsync()
        {
            return await _questionnaireRepository.GetAllAsync();
        }

        public async Task<Questionnaire> GetByIdAsync(int id)
        {
            return await _questionnaireRepository.GetByIdAsync(id);
        }

        public  async Task<Questionnaire> AddAsync(QuestionnaireCreateDto dto)
        {
            var questionnaire =  _mapper.Map<Questionnaire>(dto);
            await _questionnaireRepository.AddAsync(questionnaire);
            await _questionnaireRepository.SaveChangesAsync();

            return questionnaire;
        }

        public async Task<bool> UpdateAsync(int id, QuestionnaireCreateDto dto)
        {
            var entity = await _questionnaireRepository.GetByIdAsync(id);
            if (entity == null)
                return false;

            entity.Name = dto.Name;
            entity.SheetName = dto.SheetName;
            entity.Prompt = dto.Prompt;
            entity.GoogleSheetId = dto.GoogleSheetId;
            entity.GoogleFormUrl = dto.GoogleFormUrl;
            entity.IsActive = dto.IsActive;

            _questionnaireRepository.Update(entity);
            await _questionnaireRepository.SaveChangesAsync();
            return true;
        }


        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _questionnaireRepository.GetByIdAsync(id);
            if (entity == null)
                return false;

            _questionnaireRepository.Delete(entity);
            await _questionnaireRepository.SaveChangesAsync();
            return true;
        }
    }
}
