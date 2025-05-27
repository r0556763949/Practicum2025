using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.DTOs
{
    public class SendEmailDto
    {
        public int ClientId { get; set; }
        public string Subject { get; set; }

        public string Message { get; set; }
    }
}
