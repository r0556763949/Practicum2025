// import  { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import decodeToken from "../centeral/authUtils";

// const AuthForm = ({ onClose }: { onClose: any }) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();

//     const url = "https://localhost:7156/login";
//     const payload ={ email, password };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.Message || "An error occurred");
//       }
//         setMessage("Login successful!");
//         sessionStorage.setItem("token", data.token);
//         const tokenPayload = decodeToken(data.token);
//         setTimeout(() => {
//           if (!tokenPayload) {
//             console.error("Invalid token payload");
//             return;
//           }
//           const role = tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
//           onClose();

//           if (role === "Client") {
//             navigate("/Client");
//           } else if (role === "Manager") {
//             navigate("/Manager");
//           } else {
//             console.error("Unknown role:", role);
//           }
//         }, 2000);
//       }
//     catch (error:any) {
//       setMessage(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="medum-form">
//       <h1 className="big-letter-blue auth-title"> Login</h1>
//       <div className="auth-inputGroup">
//         <label className="auth-label">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="input"
//           required
//         />
//       </div>

//       <div className="auth-inputGroup">
//         <label className="auth-label">Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="input"
//           required
//         />
//       </div>
//       <button type="submit" className="primary-button">Login</button>

//       {message && (
//         <p
//           style={{
//             marginTop: "15px",
//             textAlign: "center",
//             fontSize: "14px",
//             color: "#d9534f",
//           }}
//         >
//           {message}
//         </p>
//       )}
//     </form>

//   );
// };



// export default AuthForm;

"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import decodeToken from "../centeral/authUtils"
import { Eye, EyeOff, LogIn } from "lucide-react"

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

    const url = "https://localhost:7156/login"
    const payload = { email, password }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.Message || "An error occurred")
      }
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
      }, 2000)
    } catch (error: any) {
      setMessage(error.message)
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

