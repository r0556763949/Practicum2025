import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import decodeToken from "../centeral/authUtils";

const AuthForm = ({ onClose }: { onClose: any }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const url = isRegistering
      ? "https://localhost:7156/register"
      : "https://localhost:7156/login";
    const payload = isRegistering
      ? { name, email, password }
      : { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.Message || "An error occurred");
      }

      if (isRegistering) {
        setMessage("Registration successful! You can now log in.");
        setTimeout(() => {
          setIsRegistering(false);
          setMessage("");
        }, 2000);
      } else {
        setMessage("Login successful!");
        sessionStorage.setItem("token", data.token);
        const tokenPayload = decodeToken(data.token);
        setTimeout(() => {
          if (!tokenPayload) {
            console.error("Invalid token payload");
            return;
          }
          const role = tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          onClose();

          if (role === "Client") {
            navigate("/Client");
          } else if (role === "Manager") {
            navigate("/Manager");
          } else {
            console.error("Unknown role:", role);
          }
        }, 2000);
      }
    } catch (error:any) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="medum-form">
      <h1 className="big-letter-blue auth-title">{isRegistering ? "Register" : "Login"}</h1>
      {isRegistering && (
        <div className="auth-inputGroup">
          <label className="auth-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
        </div>
      )}

      <div className="auth-inputGroup">
        <label className="auth-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
      </div>

      <div className="auth-inputGroup">
        <label className="auth-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
      </div>

      <button type="submit" className="primary-button">
        {isRegistering ? "Register" : "Login"}
      </button>

      <p
        className="smaell-letter-blue toggle-Text"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setMessage("");
        }}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>

      {message && (
        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            fontSize: "14px",
            color: isRegistering ? "#28a745" : "#d9534f",
          }}
        >
          {message}
        </p>
      )}
    </form>

  );
};



export default AuthForm;
