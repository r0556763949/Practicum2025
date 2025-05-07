using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class QuestionnaireFill
    {
        public int Id { get; set; }

        public int QuestionnaireId { get; set; }
        public Questionnaire Questionnaire { get; set; }

        public int? ClientId { get; set; }
        public Client? Client { get; set; }

        public string? Email { get; set; }

        public DateTime GetToFillAt { get; set; } = DateTime.UtcNow;
        public DateTime? FilledAt { get; set; } 

        public string? RawSummary { get; set; }

        public string? AiSummary { get; set; }
    }
}
