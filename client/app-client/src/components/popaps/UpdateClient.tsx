// import { useEffect, useState } from "react";
// import { fetchClientById, updateClientDetails } from "../store/ClientSlice";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store/Store";
// import decodeToken from "../centeral/authUtils";

// const UpdateClientDetailsPopup = ({ onClose }: { onClose: () => void }) => {
  
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     const payload = token && decodeToken(token); // שימוש בפונקציה שלך
    
//     const clientId = payload?.sub;

//     if (clientId) {
//       dispatch(fetchClientById(Number(clientId))).then((res: any) => {
//         if (res.payload) {
//           setName(res.payload.name);
//           setEmail(res.payload.email);
//           setAddress(res.payload.address || "");
//           setPhone(res.payload.phone || "");
//         }
//       });
//     }
//   }, [dispatch]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
    
//     const token = sessionStorage.getItem("token");
//     const payload = token && decodeToken(token); // שימוש בפונקציה שלך  
//     const clientId = payload?.sub;
//     const clientDto = {
//         id: Number(clientId),
//         name: name || "",
//         email: email || "",
//         address: address || "",
//         phone: phone || "",
//         role: "Client"
//       };
// console.log("before updateClientDetails",clientDto);

//     dispatch(updateClientDetails({ id: Number(clientId), data:clientDto }))
//       .then((res: any) => {
//         if (!res.error) {
//           setMessage("הפרטים עודכנו בהצלחה");
//           setIsError(false); 
//           setTimeout(() => {
//             setMessage("");
//             onClose();
//           }, 2000);
//         } else {
//           setMessage("אופס... יש פה בעיה, תנסה שוב");
//           setIsError(true); 
//         }
//       });
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content" style={{ height: "460px" }}>
//         <h1 className="big-letter-blue">עדכון פרטים</h1>
//         <form onSubmit={handleSubmit} className="medum-form">
//           <div className="auth-inputGroup">
//             <label className="auth-label">שם</label>
//             <input value={name} onChange={(e) => setName(e.target.value)} className="input" required />
//           </div>
//           <div className="auth-inputGroup">
//             <label className="auth-label">מייל</label>
//             <input value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
//           </div>
//           <div className="auth-inputGroup">
//             <label className="auth-label">כתובת</label>
//             <input value={address} onChange={(e) => setAddress(e.target.value)} className="input" />
//           </div>
//           <div className="auth-inputGroup">
//             <label className="auth-label">פלאפון</label>
//             <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input" />
//           </div>
//           <button type="submit" className="primary-button">עדכון</button>
//           <button type="button" className="cancel-button" onClick={onClose}>ביטול</button>
//         </form>
//         {message && (
//           <p className={`message-text ${isError ? "error" : "success"}`}>{message}</p> // הוספת מחלקת CSS בהתאם למצב
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpdateClientDetailsPopup;

"use client"

import { useEffect, useState } from "react"
import { fetchClientById, updateClientDetails } from "../store/ClientSlice"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/Store"
import decodeToken from "../centeral/authUtils"
import { Mail, MapPin, Phone, Save, User, X } from "lucide-react"

const UpdateClientDetailsPopup = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchClientData = async () => {
      const token = sessionStorage.getItem("token")
      const payload = token && decodeToken(token)

      const clientId = payload?.sub

      if (clientId) {
        try {
          const res = await dispatch(fetchClientById(Number(clientId)))
          if (res.payload) {
            setName(res.payload.name)
            setEmail(res.payload.email)
            setAddress(res.payload.address || "")
            setPhone(res.payload.phone || "")
          }
        } catch (error) {
          console.error("Error fetching client data:", error)
        } finally {
          setInitialLoading(false)
        }
      }
    }

    fetchClientData()
  }, [dispatch])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    const token = sessionStorage.getItem("token")
    const payload = token && decodeToken(token)
    const clientId = payload?.sub

    const clientDto = {
      id: Number(clientId),
      name: name || "",
      email: email || "",
      address: address || "",
      phone: phone || "",
      role: "Client",
    }

    try {
      const res = await dispatch(updateClientDetails({ id: Number(clientId), data: clientDto }))

      if (!res.error) {
        setMessage("הפרטים עודכנו בהצלחה")
        setIsError(false)
        setTimeout(() => {
          setMessage("")
          onClose()
        }, 2000)
      } else {
        setMessage("אופס... יש פה בעיה, תנסה שוב")
        setIsError(true)
      }
    } catch (error) {
      setMessage("אופס... יש פה בעיה, תנסה שוב")
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <User className="modal-title-icon" />
            עדכון פרטים אישיים
          </h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        {initialLoading ? (
          <div className="modal-loading">
            <div className="loading-spinner"></div>
            <p>טוען פרטים...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-body">
            <div className="form-group">
              <label>
                <User className="form-icon" />
                שם:
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
                placeholder="הזן שם"
              />
            </div>

            <div className="form-group">
              <label>
                <Mail className="form-icon" />
                דואר אלקטרוני:
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
                placeholder="הזן דואר אלקטרוני"
              />
            </div>

            <div className="form-group">
              <label>
                <MapPin className="form-icon" />
                כתובת:
              </label>
              <input
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
        )}

        {message && <p className={`modal-message ${isError ? "error" : "success"}`}>{message}</p>}
      </div>
    </div>
  )
}

export default UpdateClientDetailsPopup



