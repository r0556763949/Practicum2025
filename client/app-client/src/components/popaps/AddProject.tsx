
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createProject } from "../store/ProjectSlice"
import type { AppDispatch } from "../store/Store"
import { Calendar, FileText, MapPin, Plus, X } from "lucide-react"

const AddProject = ({ client, onClose, onSuccess }: { client: any; onClose: any; onSuccess: any }) => {
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [startAt, setStartAt] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleSave = async () => {
    if (!description) {
      setMessage("יש להזין תיאור פרויקט")
      return
    }
    setIsLoading(true)
    try {
      const projectData = { description, address, startAt }
      await dispatch(createProject({ clientId: client.id, projectData }))
      setMessage("הפרויקט נוצר בהצלחה!")
      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch (err) {
      setMessage("שגיאה ביצירת הפרויקט")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <Plus className="modal-title-icon" />
            הוספת פרויקט עבור {client.name}
          </h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>
              <FileText className="form-icon" />
              תיאור:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
              placeholder="הזן תיאור פרויקט"
            />
          </div>

          <div className="form-group">
            <label>
              <MapPin className="form-icon" />
              כתובת:
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              placeholder="הזן כתובת"
            />
          </div>

          <div className="form-group">
            <label>
              <Calendar className="form-icon" />
              תאריך התחלה:
            </label>
            <input type="date" value={startAt} onChange={(e) => setStartAt(e.target.value)} className="form-input" />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-button secondary">
            ביטול
          </button>
          <button
            onClick={handleSave}
            className={`modal-button primary ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                <span>שומר...</span>
              </>
            ) : (
              <span>שמירה</span>
            )}
          </button>
        </div>

        {message && <p className={`modal-message ${message.includes("בהצלחה") ? "success" : "error"}`}>{message}</p>}
      </div>
    </div>
  )
}

export default AddProject

