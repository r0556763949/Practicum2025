
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import decodeToken from "../centeral/authUtils"
import { Eye, EyeOff, LogIn } from "lucide-react"
import axiosInstance from "../store/axiosInstance"

const AuthForm = ({ onClose }: { onClose: any }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const url = "/login"
    const payload = { email, password }
    try {
      const response = await axiosInstance.post(url, payload)
      const data = response.data
      setMessage("Login successful!")
      sessionStorage.setItem("token", data.token)
      const tokenPayload = decodeToken(data.token)
      setTimeout(() => {
        if (!tokenPayload) {
          console.error("Invalid token payload")
          return
        }
        const role = tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        onClose()
        if (role === "Client") {
          navigate("/Client")
        } else if (role === "Manager") {
          navigate("/Manager")
        } else {
          console.error("Unknown role:", role)
        }
      }, 1000)
    } catch (error: any) {
      const messageFromServer = error.response?.data?.message || error.message || "שגיאה לא ידועה"
      setMessage(messageFromServer)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-header">
        <LogIn className="auth-icon" />
        <h1 className="auth-title">התחברות</h1>
      </div>

      <div className="auth-input-group">
        <label className="auth-label">דואר אלקטרוני</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          required
          placeholder="הזן את כתובת הדואר האלקטרוני שלך"
        />
      </div>

      <div className="auth-input-group">
        <label className="auth-label">סיסמה</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
            placeholder="הזן את הסיסמה שלך"
          />
          <button type="button" className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button type="submit" className={`auth-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="loading-spinner"></span>
            <span>מתחבר...</span>
          </>
        ) : (
          <span>התחברות</span>
        )}
      </button>

      {message && <p className={`auth-message ${message.includes("successful") ? "success" : "error"}`}>{message}</p>}
    </form>
  )
}

export default AuthForm

