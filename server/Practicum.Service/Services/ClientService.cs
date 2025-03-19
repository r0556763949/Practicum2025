using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Service.Services
{
    public class ClientService
    {
        private readonly IClientRepository _clientRepository;
        public ClientService(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }
        public IEnumerable<Client> GetAllClients()
        {
            // הנחה שיש מתודה בשם GetAll ב-IClientRepository שמחזירה את כל הלקוחות
            return _clientRepository.GetAll();
        }
    }
}
