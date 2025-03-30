import { useState } from "react";

const CreateClientPopup = ({ onClose }:{ onClose:any }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7156/api/Client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, address, email, phone,role: "Client"  }),
      });

      if (!response.ok) {
        throw new Error("Failed to create client");
      }

      setMessage("Client created successfully!");
      setTimeout(() => {
        setMessage("");
        onClose();
      }, 2000);
    } catch (error:any) {
      setMessage(error.message);
    }
  };

 
  return (
    <div className="popup-overlay" >
      <div className="popup-content" style={{ height: "450px" }}>
        <h1 className="big-letter-blue">Create Client</h1>
        <form onSubmit={handleSubmit} className="medum-form">
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
            <label className="auth-label">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input"
            />
          </div>

          <div className="auth-inputGroup">
            <label className="auth-label">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
          </div>

          <button type="submit" className="primary-button">Create</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </form>

        {message && <p className="message-text">{message}</p>}
      </div>
    </div>
  );
};

export default CreateClientPopup;
