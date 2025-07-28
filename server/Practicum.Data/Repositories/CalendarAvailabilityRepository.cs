using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Data.Repositories
{
    public class CalendarAvailabilityRepository : ICalendarAvailabilityRepository
    {
        private readonly DataContext _context;
        public CalendarAvailabilityRepository(DataContext context)
        {
            _context = context;
        }
        public Task AddAsync(CalenderAvailability availability)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CalenderAvailability>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<CalenderAvailability?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(CalenderAvailability availability)
        {
            throw new NotImplementedException();
        }
    }
}
