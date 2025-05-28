
import { useEffect } from "react"
import { User, Mail, MapPin, Phone, X } from "lucide-react"
import { AppDispatch, RootState } from "../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientById } from "../store/ClientSlice";

const ClientDetails = ({ clientId, onClose }: { clientId: number; onClose: any }) => {
  const { currentClient, loading, error } = useSelector((state: RootState) => state.clients)
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    if (clientId) {
      dispatch(fetchClientById(clientId))
    }
  }, [dispatch, clientId])

  return (
    <div className="modal-overlay">
      <div className="modal-container client-details-modal">
        <div className="modal-header">
          <h2 className="modal-title">פרטי לקוח</h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        {loading && (
          <div className="modal-loading">
            <div className="loading-spinner"></div>
            <p>טוען פרטים...</p>
          </div>
        )}

        {error && <p className="modal-error">{error}</p>}

        {currentClient && (
          <div className="client-details">
            <div className="client-avatar">
              <User size={40} />
            </div>

            <div className="client-info-group">
              <div className="client-info-item">
                <User className="client-info-icon" />
                <div className="client-info-content">
                  <label>שם:</label>
                  <p>{currentClient.name}</p>
                </div>
              </div>

              <div className="client-info-item">
                <Mail className="client-info-icon" />
                <div className="client-info-content">
                  <label>דואר אלקטרוני:</label>
                  <p>{currentClient.email}</p>
                </div>
              </div>

              <div className="client-info-item">
                <MapPin className="client-info-icon" />
                <div className="client-info-content">
                  <label>כתובת:</label>
                  <p>{currentClient.address || "לא צוין"}</p>
                </div>
              </div>

              <div className="client-info-item">
                <Phone className="client-info-icon" />
                <div className="client-info-content">
                  <label>טלפון:</label>
                  <p>{currentClient.phone || "לא צוין"}</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={onClose} className="modal-button secondary">
                ביטול
              </button>
              <button onClick={onClose} className="modal-button primary">
                סגור
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientDetails

