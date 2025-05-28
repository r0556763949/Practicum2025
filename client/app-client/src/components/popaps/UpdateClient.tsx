
import { useEffect, useState } from "react"
import { fetchClientById, updateClientDetails } from "../store/ClientSlice"
import decodeToken from "../centeral/authUtils"
import { Mail, MapPin, Phone, Save, User, X } from "lucide-react"
import { AppDispatch, RootState } from "../store/Store"
import { useDispatch, useSelector } from "react-redux"

const UpdateClientDetailsPopup = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { currentClient  } = useSelector((state: RootState) => state.clients)

  const token = sessionStorage.getItem("token")
  const payload = token && decodeToken(token)
  const clientId = payload?.sub

  useEffect(() => {
    if (clientId) {
      dispatch(fetchClientById(Number(clientId)))
    }
  }, [dispatch, clientId])

  useEffect(() => {
    if (currentClient) {
      setName(currentClient.name || "")
      setEmail(currentClient.email || "")
      setAddress(currentClient.address || "")
      setPhone(currentClient.phone || "")
    }
  }, [currentClient])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientId) return

    setIsLoading(true)

    const clientDto = {
      id: Number(clientId),
      name: name || "",
      email: email || "",
      address: address || "",
      phone: phone || "",
      role: "Client",
    }

    try {
      await dispatch(updateClientDetails({ id: Number(clientId), data: clientDto })).unwrap()
      setMessage("הפרטים עודכנו בהצלחה")
      setIsError(false)
      setTimeout(() => {
        setMessage("")
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Error updating client details:", error)
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

        {isLoading ? (
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



