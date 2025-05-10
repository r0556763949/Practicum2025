using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.DTOs
{
    public class QuestionnaireCreateDto
    {
            [Required]
            public string Name { get; set; }

            [Required]
            public string SheetName { get; set; }

            [Required]
            public string Prompt { get; set; }

            [Required]
            public string GoogleSheetId { get; set; }

            [Required]
            public string GoogleFormUrl { get; set; }

            public bool IsActive { get; set; } = true;
    }
}
