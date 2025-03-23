using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Service.Services
{
    public class PasswordServicecs
    {
        public string SetPassword(string password)
        {
            return  BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyPassword(string password,string hash)
        {
            Console.WriteLine($"Password: {password}");
            Console.WriteLine($"Hash: {hash}"); 

            return BCrypt.Net.BCrypt.Verify(password, hash);

        }


    }
}
