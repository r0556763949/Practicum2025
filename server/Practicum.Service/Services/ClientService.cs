using Amazon.Runtime.Internal;
using AutoMapper;
using Practicum.Core.DTOs;
using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;


namespace Practicum.Service.Services
{
    public class ClientService
    {
        private readonly IClientRepository _clientRepository;
        private readonly PasswordServicecs _passwordService;
        private readonly JwtService _jwtService;
        private readonly IMapper _mapper;
        private readonly EmailService _emailService;

        public ClientService(IClientRepository clientRepository, PasswordServicecs passwordService, JwtService jwtService, IMapper mapper, EmailService emailService)
        {
            _clientRepository = clientRepository;
            _passwordService = passwordService;
            _jwtService = jwtService;
            _mapper = mapper;
            _emailService = emailService;
        }
        public IEnumerable<ClientDto> GetAllClients()
        {
            var clients = _clientRepository.GetAll();

            return _mapper.Map<IEnumerable<ClientDto>>(clients);
        }
        //public async Task<Client> Register(string name, string email, string password)
        //{

        //    var client = new Client
        //    {
        //        Name = name,
        //        Email = email,
        //        PasswordHash = _passwordService.SetPassword(password),
        //        Role = "Client"
        //    };

        //    await  _clientRepository.AddAsync(client);
        //    return client;
        //}

        public string Login(string email, string password)
        {
            var client = _clientRepository.GetByEmail(email);
            if (client == null || !_passwordService.VerifyPassword(password, client.PasswordHash))
            {
                return null; // אימות נכשל
            }

            return _jwtService.GenerateToken(client.Id, client.Email, client.Role);
        }
        public async Task<ClientDto> GetClientByIdAsync(int id)
        {
           Client result  =  await _clientRepository.GetClientByIdAsync(id);
            return _mapper.Map<ClientDto>(result);
        }
        public async Task DeleteClientAsync(int clientId)
        {
            var client = await _clientRepository.GetByIdAsync(clientId);
            if (client == null)
            {
                throw new KeyNotFoundException();
            }

            await _clientRepository.DeleteAsync(client);
        }

        public string GenerateRandomPassword()
        {
            return Guid.NewGuid().ToString().Substring(0, 8);
        }
        public async Task CreateClientAsync(ClientDto clientDto)
        {
            string password = GenerateRandomPassword();
            Client client = _mapper.Map<Client>(clientDto);
            client.PasswordHash = _passwordService.SetPassword(password);
            await _clientRepository.CreateAsync(client);
            await _emailService.SendWelcomeEmail(client.Email, client.Name, password);
        }
        public async Task UpdateClientAsync(int id, ClientDto dto)
        {
            var client = await _clientRepository.GetByIdAsync(id);
            if (client == null)
                throw new KeyNotFoundException();

            client.Name = dto.Name;
            client.Email = dto.Email;
            client.Address = dto.Address;
            client.Phone = dto.Phone;

            await _clientRepository.UpdateAsync(client);
        }

        public async Task UpdateClientPasswordAsync(int id, string newPassword)
        {
            var client = await _clientRepository.GetByIdAsync(id);
            if (client == null)
                throw new KeyNotFoundException();

            client.PasswordHash = _passwordService.SetPassword(newPassword);
            await _clientRepository.UpdateAsync(client);
        }
    }
    }
