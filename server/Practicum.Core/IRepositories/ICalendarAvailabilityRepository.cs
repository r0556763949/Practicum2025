using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.IRepositories
{
    public interface ICalendarAvailabilityRepository
    {
        Task<IEnumerable<CalenderAvailability>> GetAllAsync();
        Task<CalenderAvailability?> GetByIdAsync(int id);
        Task AddAsync(CalenderAvailability availability);
        Task UpdateAsync(CalenderAvailability availability);
        Task DeleteAsync(int id);
    }
}
