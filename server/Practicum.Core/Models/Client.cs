using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;

namespace Practicum.Core.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PasswordHash { get; set; }  
        public string? Address { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public List<Project>? Projects { get; set; }
        public string Role { get; set; } = "Client";
       
        
    }
}
