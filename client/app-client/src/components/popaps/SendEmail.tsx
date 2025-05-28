
import  React from "react"

import { useState } from "react"
import { X, Mail, Send, MessageSquare, Loader } from "lucide-react"
import axiosInstance from "../store/axiosInstance"

interface SendEmailModalProps {
  clientId: number
  onClose: () => void
}

const SendEmailModal = ({ clientId, onClose }: SendEmailModalProps) => {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!subject.trim() || !message.trim()) {
      setStatus({ type: "error", message: "נא למלא את כל השדות" })
      return
    }
    setIsLoading(true)
    setStatus(null)
  
    try {
      await axiosInstance.post("/Email/SendEmail", {
        clientId,
        subject,
        message,
      })
  
      setStatus({ type: "success", message: "המייל נשלח בהצלחה!" })
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error("שגיאה בשליחת המייל:", error)
      setStatus({ type: "error", message: "שגיאה בשליחת המייל. נסה שוב." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <Mail className="modal-title-icon" />
            שליחת מייל ללקוח
          </h2>
          <button className="modal-close-button" onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {status && (
              <div className={`form-status ${status.type}`}>
                {status.type === "success" ? <Mail className="status-icon" /> : <X className="status-icon" />}
                {status.message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="subject">
                <MessageSquare className="form-icon" />
                נושא המייל
              </label>
              <input
                id="subject"
                type="text"
                className="form-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="הכנס נושא למייל..."
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <Mail className="form-icon" />
                תוכן ההודעה
              </label>
              <textarea
                id="message"
                className="form-input"
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="כתוב את ההודעה כאן..."
                disabled={isLoading}
                style={{ resize: "vertical", minHeight: "120px" }}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="modal-button secondary" onClick={onClose} disabled={isLoading}>
              ביטול
            </button>
            <button
              type="submit"
              className={`modal-button primary ${isLoading ? "loading" : ""}`}
              disabled={isLoading || !subject.trim() || !message.trim()}
            >
              {isLoading ? (
                <>
                  <Loader className="loading-spinner" />
                  שולח...
                </>
              ) : (
                <>
                  <Send />
                  שלח מייל
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SendEmailModal
