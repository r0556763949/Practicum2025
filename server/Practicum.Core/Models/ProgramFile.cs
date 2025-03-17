using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class ProgramFile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Path { get; set; }
        public DateOnly? CreateAt { get; set; }
        public int? ClientId { get; set; }
        public List<ReMark>? ReMarks { get; set; }
    }
}
