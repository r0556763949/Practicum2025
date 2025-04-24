import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Store";
import { updateClientPassword } from "../store/ClientSlice";
import decodeToken from "../centeral/authUtils";
import { Eye, EyeOff } from "lucide-react";

const UpdatePasswordPopup = ({ onClose }: { onClose: () => void }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage("יש למלא את כל השדות");
      setIsError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("הסיסמאות אינן תואמות");
      setIsError(true);
      return;
    }

    const token = sessionStorage.getItem("token");
    const payload = token && decodeToken(token);
    const clientId = payload?.sub;

    if (!clientId) {
      setMessage("משתמש לא מזוהה");
      setIsError(true);
      return;
    }

    dispatch(updateClientPassword({ id: Number(clientId), newPassword }))
      .then((res: any) => {
        if (!res.error) {
          setMessage("הסיסמה עודכנה בהצלחה!");
          setIsError(false);
          setTimeout(() => {
            setMessage("");
            onClose();
          }, 2000);
        } else {
          setMessage(res.payload || "אירעה שגיאה");
          setIsError(true);
        }
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" style={{ height: "360px" }}>
        <h1 className="big-letter-blue">שינוי סיסמה</h1>
        <form onSubmit={handleSubmit} className="medum-form">
          <div className="auth-inputGroup">
            <label className="auth-label">סיסמה חדשה</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="input password-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span className="toggle-eye" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <div className="auth-inputGroup">
            <label className="auth-label">אימות סיסמה</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                className="input password-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="toggle-eye" onClick={() => setShowConfirm((prev) => !prev)}>
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <button type="submit" className="primary-button">עדכון</button>
          <button type="button" className="cancel-button" onClick={onClose}>ביטול</button>
        </form>

        {message && (
          <p className={`message-text ${isError ? "error" : "success"}`}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default UpdatePasswordPopup;
