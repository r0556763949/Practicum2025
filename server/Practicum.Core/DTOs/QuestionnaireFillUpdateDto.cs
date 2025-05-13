using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.DTOs
{
    public class QuestionnaireFillUpdateDto
    {
        public DateTime FilledAt { get; set; }
        public string? RawSummary { get; set; }
        public string? AiSummary { get; set; }
    }
}
