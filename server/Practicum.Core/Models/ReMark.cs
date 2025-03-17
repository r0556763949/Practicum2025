using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class ReMark
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreateAt { get; set; }
        public int? ClientId { get; set; }
        public Client? Creator { get; set; }
        public int ProgramFileId { get; set; }
        public ProgramFile ProgramFile { get; set; }

    }
}
