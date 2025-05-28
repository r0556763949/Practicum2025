
import { useState } from "react"
import { Mail, MapPin, Phone, Plus, User, X } from "lucide-react"
import { AppDispatch } from "../store/Store"
import { useDispatch } from "react-redux"
import { createClient } from "../store/ClientSlice"

const CreateClientPopup = ({ onClose }: { onClose: any }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!name || !email) {
      setMessage("יש להזין שם ואימייל")
      return
    }
  
    setIsLoading(true)
    setMessage("")
  
    try {
      const resultAction = await dispatch(
        createClient({ name, email, address, phone, role: "Client", id: 0 })
      )
  
      if (createClient.fulfilled.match(resultAction)) {
        setMessage("הלקוח נוצר בהצלחה!")
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        setMessage("שגיאה ביצירת הלקוח")
      }
    } catch (error) {
      setMessage("אירעה שגיאה לא צפויה")
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
            יצירת לקוח חדש
          </h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>
              <User className="form-icon" />
              שם:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
              placeholder="הזן שם לקוח"
            />
          </div>

          <div className="form-group">
            <label>
              <Mail className="form-icon" />
              דואר אלקטרוני:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
              placeholder="הזן כתובת דואר אלקטרוני"
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
              <Phone className="form-icon" />
              טלפון:
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              placeholder="הזן מספר טלפון"
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="modal-button secondary" onClick={onClose}>
              ביטול
            </button>
            <button type="submit" className={`modal-button primary ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  <span>יוצר...</span>
                </>
              ) : (
                <span>יצירה</span>
              )}
            </button>
          </div>
        </form>

        {message && <p className={`modal-message ${message.includes("בהצלחה") ? "success" : "error"}`}>{message}</p>}
      </div>
    </div>
  )
}

export default CreateClientPopup

