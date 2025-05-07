using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.IRepositories
{
    public interface IQuestionnaireRepository
    {
        Task<IEnumerable<Questionnaire>> GetAllAsync();
        Task<Questionnaire> GetByIdAsync(int id);
        Task AddAsync(Questionnaire questionnaire);
        void Update(Questionnaire questionnaire);
        void Delete(Questionnaire questionnaire);
        Task SaveChangesAsync();
    }
}
