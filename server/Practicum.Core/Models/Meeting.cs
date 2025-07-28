using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class Meeting
    {
        public int Id { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }

        public string Status { get; set; } = "Scheduled"; // Scheduled / Canceled / Completed

        public string? Summary { get; set; } // תקציר הפגישה

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
