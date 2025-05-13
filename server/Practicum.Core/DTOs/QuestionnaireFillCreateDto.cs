using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.DTOs
{
    public class QuestionnaireFillCreateDto
    {
        public int QuestionnaireId { get; set; }

        public int? ClientId { get; set; }
        public int? ProjectId { get; set; }

    }
}
