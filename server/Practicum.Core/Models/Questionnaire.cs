using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class Questionnaire
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SheetName { get; set; }
        public string Prompt { get; set; }
        public string GoogleSheetId { get; set; }
        public string GoogleFormUrl { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
