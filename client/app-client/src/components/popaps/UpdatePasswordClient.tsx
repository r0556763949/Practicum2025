
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/Store"
import { updateClientPassword } from "../store/ClientSlice"
import decodeToken from "../centeral/authUtils"
import { Eye, EyeOff, Lock, X, Save } from "lucide-react"

const UpdatePasswordPopup = ({ onClose }: { onClose: () => void }) => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPassword || !confirmPassword) {
      setMessage("יש למלא את כל השדות")
      setIsError(true)
      setTimeout(() => {
        setMessage("")
        setIsError(false)
      }, 2000)
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage("הסיסמאות אינן תואמות")
      setIsError(true)
      setTimeout(() => {
        setMessage("")
        setIsError(false)
      }, 2000)
      return
    }

    const token = sessionStorage.getItem("token")
    const payload = token && decodeToken(token)
    const clientId = payload?.sub

    if (!clientId) {
      setMessage("משתמש לא מזוהה")
      setIsError(true)
      return
    }

    setIsLoading(true)

    try {
      const res: any = await dispatch(updateClientPassword({ id: Number(clientId), newPassword }))
      if (!res.error) {
        setMessage("הסיסמה עודכנה בהצלחה!")
        setIsError(false)
        setTimeout(() => {
          setMessage("")
          onClose()
        }, 2000)
      } else {
        setMessage("אופס... יש פה בעיה, תנסה שוב")
        setIsError(true)
        setTimeout(() => {
          setMessage("")
          setIsError(false)
        }, 2000)
      }
    } catch (error) {
      setMessage("אופס... יש פה בעיה, תנסה שוב")
      setIsError(true)
      setTimeout(() => {
        setMessage("")
        setIsError(false)
      }, 2000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <Lock className="modal-title-icon" />
            שינוי סיסמה
          </h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>
              סיסמה חדשה:
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span className="toggle-eye" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>
              אימות סיסמה:
            </label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="toggle-eye" onClick={() => setShowConfirm((prev) => !prev)}>
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="modal-button secondary" onClick={onClose}>
              ביטול
            </button>
            <button
              type="submit"
              className={`modal-button primary ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  <span>מעדכן...</span>
                </>
              ) : (
                <>
                  <Save className="button-icon" />
                  <span>עדכון</span>
                </>
              )}
            </button>
          </div>
        </form>

        {message && <p className={`modal-message ${isError ? "error" : "success"}`}>{message}</p>}
      </div>
    </div>
  )
}

export default UpdatePasswordPopup

