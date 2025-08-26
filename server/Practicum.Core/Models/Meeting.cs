using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public enum MeetingStatus
    {
        Scheduled,
        Canceled,
        Completed
    }
    public class Meeting
    {
        public int Id { get; set; }

        public int CalenderAvailabilityId { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public DateTime StartMeeting { get; set; }

        public MeetingStatus Status { get; set; } = MeetingStatus.Scheduled;

        public string? Summary { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
