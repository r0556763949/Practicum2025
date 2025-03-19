using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public Client Client { get; set; }
        public DateOnly StartAt { get; set; }


    }
}
