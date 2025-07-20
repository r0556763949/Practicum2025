"use client"

import { useState, useEffect, useCallback } from "react"
import { Calendar, momentLocalizer, type SlotInfo } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar as CalendarIcon , ArrowRight, Plus, Clock, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

const localizer = momentLocalizer(moment)

interface AvailableSlot {
  id: number
  architectId: number
  startTime: Date
  endTime: Date
  isBooked: boolean
  meetingDurationInMinutes: number
  clientId?: number
}

interface Meeting {
  id: number
  clientId: number
  architectId: number
  startTime: Date
  endTime: Date
  status: "Scheduled" | "Canceled" | "Completed"
  notes: string
}

interface CalendarEvent {
  id: number
  title: string
  start: Date
  end: Date
  resource: {
    type: "available" | "meeting"
    isBooked?: boolean
    clientId?: number
    status?: string
  }
}

const ManagerCalendar = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null)
  const [meetingDuration, setMeetingDuration] = useState(30)
  const [showSlotModal, setShowSlotModal] = useState(false)

  // Mock data - replace with real API calls
  useEffect(() => {
    // Mock available slots
    const mockSlots: AvailableSlot[] = [
      {
        id: 1,
        architectId: 1,
        startTime: new Date("2024-12-25T10:00:00"),
        endTime: new Date("2024-12-25T12:00:00"),
        isBooked: false,
        meetingDurationInMinutes: 30,
      },
      {
        id: 2,
        architectId: 1,
        startTime: new Date("2024-12-26T14:00:00"),
        endTime: new Date("2024-12-26T16:00:00"),
        isBooked: false,
        meetingDurationInMinutes: 30,
      },
    ]

    // Mock meetings
    const mockMeetings: Meeting[] = [
      {
        id: 1,
        clientId: 101,
        architectId: 1,
        startTime: new Date("2024-12-24T10:00:00"),
        endTime: new Date("2024-12-24T10:30:00"),
        status: "Scheduled",
        notes: "פגישת ייעוץ ראשונית",
      },
      {
        id: 2,
        clientId: 102,
        architectId: 1,
        startTime: new Date("2024-12-24T14:00:00"),
        endTime: new Date("2024-12-24T14:30:00"),
        status: "Scheduled",
        notes: "סקירת תוכניות",
      },
    ]

    setAvailableSlots(mockSlots)
    setMeetings(mockMeetings)
  }, [])

  // Update events when slots or meetings change
  useEffect(() => {
    const calendarEvents: CalendarEvent[] = []

    // Add available slots
    availableSlots.forEach((slot) => {
      if (!slot.isBooked) {
        calendarEvents.push({
          id: slot.id,
          title: `זמין (${slot.meetingDurationInMinutes} דק')`,
          start: slot.startTime,
          end: slot.endTime,
          resource: {
            type: "available",
            isBooked: slot.isBooked,
          },
        })
      }
    })

    // Add meetings
    meetings.forEach((meeting) => {
      calendarEvents.push({
        id: meeting.id + 1000,
        title: `פגישה - לקוח ${meeting.clientId}`,
        start: meeting.startTime,
        end: meeting.endTime,
        resource: {
          type: "meeting",
          clientId: meeting.clientId,
          status: meeting.status,
        },
      })
    })

    setEvents(calendarEvents)
  }, [availableSlots, meetings])

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo)
    setShowSlotModal(true)
  }, [])

  const createAvailableSlot = () => {
    if (!selectedSlot) return

    const newSlot: AvailableSlot = {
      id: availableSlots.length + 1,
      architectId: 1,
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
      meetingDurationInMinutes: meetingDuration,
      isBooked: false,
    }

    setAvailableSlots([...availableSlots, newSlot])
    setShowSlotModal(false)
    setSelectedSlot(null)
  }

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#003366"
    let color = "white"

    if (event.resource.type === "available") {
      backgroundColor = "#66ccff"
      color = "#003366"
    } else if (event.resource.type === "meeting") {
      backgroundColor = "#003366"
      color = "white"
    }

    return {
      style: {
        backgroundColor,
        color,
        border: "none",
        borderRadius: "4px",
        fontSize: "12px",
      },
    }
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="primary-button back-button" onClick={() => navigate("/Manager")}>
          <ArrowRight className="back-icon" />
          חזרה
        </button>
        <div className="calendar-title-section">
          <CalendarIcon className="calendar-icon" />
          <h1 className="calendar-title">יומן זמינות אדריכל</h1>
        </div>
        <div className="calendar-stats">
          <div className="stat-item">
            <Clock className="stat-icon" />
            <span>{availableSlots.filter((s) => !s.isBooked).length} זמנים זמינים</span>
          </div>
          <div className="stat-item">
            <Users className="stat-icon" />
            <span>{meetings.filter((m) => m.status === "Scheduled").length} פגישות מתוזמנות</span>
          </div>
        </div>
      </div>

      <div className="calendar-content">
        <div className="calendar-wrapper">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={eventStyleGetter}
            views={["month", "week", "day"]}
            defaultView="week"
            step={30}
            timeslots={1}
            min={new Date(2024, 0, 1, 8, 0)}
            max={new Date(2024, 0, 1, 20, 0)}
            messages={{
              next: "הבא",
              previous: "הקודם",
              today: "היום",
              month: "חודש",
              week: "שבוע",
              day: "יום",
              agenda: "סדר יום",
              date: "תאריך",
              time: "שעה",
              event: "אירוע",
              noEventsInRange: "אין אירועים בטווח זה",
              showMore: (total) => `+${total} נוספים`,
            }}
          />
        </div>

        <div className="calendar-legend">
          <h3>מקרא:</h3>
          <div className="legend-item">
            <div className="legend-color available"></div>
            <span>זמן זמין</span>
          </div>
          <div className="legend-item">
            <div className="legend-color meeting"></div>
            <span>פגישה מתוזמנת</span>
          </div>
        </div>
      </div>

      {showSlotModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3 className="modal-title">הוספת זמן זמין</h3>
            <div className="form-group">
              <label>תאריך ושעה:</label>
              <p>
                {selectedSlot?.start.toLocaleString("he-IL")} - {selectedSlot?.end.toLocaleString("he-IL")}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="duration">משך פגישה (דקות):</label>
              <select
                id="duration"
                className="input-field"
                value={meetingDuration}
                onChange={(e) => setMeetingDuration(Number(e.target.value))}
              >
                <option value={15}>15 דקות</option>
                <option value={30}>30 דקות</option>
                <option value={45}>45 דקות</option>
                <option value={60}>60 דקות</option>
              </select>
            </div>
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => {
                  setShowSlotModal(false)
                  setSelectedSlot(null)
                }}
              >
                ביטול
              </button>
              <button className="save-button" onClick={createAvailableSlot}>
                <Plus className="plus-icon" />
                הוסף זמן
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManagerCalendar

