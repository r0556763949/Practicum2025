using Practicum.Core.DTOs;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.IRepositories
{
    public interface IClientRepository
    {
        IEnumerable<Client> GetAll();
        Task AddAsync(Client client);

        Task<Client> GetByEmailAsync(string email);
        Task<Client> GetClientByIdAsync(int id);

        Task<Client> GetByIdAsync(int clientId);

         Task DeleteAsync(Client client);

        Task CreateAsync(Client client);
        Task UpdateAsync(Client client);
    }
}
