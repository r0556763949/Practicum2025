using Practicum.Core.DTOs;
using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Data.Repositories
{
    public class ClientRepository: IClientRepository
    {
        private readonly DataContext _context;
        public ClientRepository(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<Client> GetAll()
        {
            return _context.Clients.ToList();
        }

        public async Task AddAsync(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync(); 
        }
        public Client GetByEmail(string email)
        {
            return _context.Clients.FirstOrDefault(c => c.Email == email);
        }
        public async Task<Client> GetClientByIdAsync(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null) return null;

            return client;
        }
    }
}
