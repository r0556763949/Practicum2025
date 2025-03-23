using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.DTOs
{
    public class CreateProjectDto
    {
            public string Description { get; set; }
            public string Address { get; set; }
            public DateOnly StartAt { get; set; }
    }
}
