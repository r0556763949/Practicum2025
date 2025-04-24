import { useEffect, useState } from "react";
import { fetchClientById, updateClientDetails } from "../store/ClientSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Store";
import decodeToken from "../centeral/authUtils";

const UpdateClientDetailsPopup = ({ onClose }: { onClose: () => void }) => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const payload = token && decodeToken(token); // שימוש בפונקציה שלך
    
    const clientId = payload?.sub;

    if (clientId) {
      dispatch(fetchClientById(Number(clientId))).then((res: any) => {
        if (res.payload) {
          setName(res.payload.name);
          setEmail(res.payload.email);
          setAddress(res.payload.address || "");
          setPhone(res.payload.phone || "");
        }
      });
    }
  }, [dispatch]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const payload = token && decodeToken(token); // שימוש בפונקציה שלך  
    const clientId = payload?.sub;
    const clientDto = {
        id: Number(clientId),
        name: name || "",
        email: email || "",
        address: address || "",
        phone: phone || "",
        role: "Client"
      };
console.log("before updateClientDetails",clientDto);

    dispatch(updateClientDetails({ id: Number(clientId), data:clientDto }))
      .then((res: any) => {
        if (!res.error) {
          setMessage("Details updated successfully!");
          setTimeout(() => {
            setMessage("");
            onClose();
          }, 2000);
        } else {
          setMessage(res.payload);
        }
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" style={{ height: "460px" }}>
        <h1 className="big-letter-blue">Update Your Details</h1>
        <form onSubmit={handleSubmit} className="medum-form">
          <div className="auth-inputGroup">
            <label className="auth-label">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="input" required />
          </div>
          <div className="auth-inputGroup">
            <label className="auth-label">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
          </div>
          <div className="auth-inputGroup">
            <label className="auth-label">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="input" />
          </div>
          <div className="auth-inputGroup">
            <label className="auth-label">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input" />
          </div>
          <button type="submit" className="primary-button">Update</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </form>
        {message && <p className="message-text">{message}</p>}
      </div>
    </div>
  );
};

export default UpdateClientDetailsPopup;


