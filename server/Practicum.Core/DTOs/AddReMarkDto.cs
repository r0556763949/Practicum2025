using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.DTOs
{
    public class AddReMarkDto
    {
        public string Content { get; set; }  // תוכן ההערה
        public int FileId { get; set; }
        //public int? ClientId { get; set; }
    }
}
