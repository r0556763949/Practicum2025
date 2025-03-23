using Amazon.Runtime.Internal;
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
        private readonly PasswordServicecs _passwordService;
        private readonly JwtService _jwtService;
        public ClientService(IClientRepository clientRepository, PasswordServicecs passwordService, JwtService jwtService)
        {
            _clientRepository = clientRepository;
            _passwordService = passwordService;
            _jwtService = jwtService;
        }
        public IEnumerable<Client> GetAllClients()
        {
            // הנחה שיש מתודה בשם GetAll ב-IClientRepository שמחזירה את כל הלקוחות
            return _clientRepository.GetAll();
        }
        public async Task<Client> Register(string name, string email, string password)
        {
            //if (_clientRepository.GetByEmail(email) != null)
            //{
            //    throw new Exception("Email already in use"); // אפשר לשנות לשגיאה יותר מתאימה
            //}

            var client = new Client
            {
                Name = name,
                Email = email,
                PasswordHash = _passwordService.SetPassword(password),
                Role = "Client"
            };

            await  _clientRepository.AddAsync(client);
            return client;
        }

        public string Login(string email, string password)
        {
            var client = _clientRepository.GetByEmail(email);
            if (client == null || !_passwordService.VerifyPassword(password, client.PasswordHash))
            {
                return null; // אימות נכשל
            }

            return _jwtService.GenerateToken(client.Id, client.Email, client.Role);
        }
    }
    }
