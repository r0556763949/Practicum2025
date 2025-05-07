// import  { useEffect, useState } from 'react';
// import axios from 'axios';



// const ClientDetails = ({ clientId, onClose }: { clientId:number, onClose:any }) => {
//   const [clientData, setClientData] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchClientDetails = async () => {
//       try {
//         const response = await axios.get(`https://localhost:7156/api/Client/${clientId}`);
//         setClientData(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.log(err);
//         setError("Failed to load client details");
//         setLoading(false);
//       }
//     };

//     fetchClientDetails();
//   }, [clientId]);

//   return (
//     <div className="CLIENTDETAILSmodal-overlay">
//       <div className="CLIENTDETAILSmodal-container">
//         <h2 className="CLIENTDETAILSmodal-title">Client Details</h2>
//         {loading && <p>Loading...</p>}
//         {error && <p className="CLIENTDETAILSerror">{error}</p>}
//         {clientData && (
//           <div className="CLIENTDETAILSclient-details">
//             <div className="CLIENTDETAILSform-group">
//               <label>Name:</label>
//               <p>{clientData.name}</p>
//             </div>
//             <div className="CLIENTDETAILSform-group">
//               <label>Email:</label>
//               <p>{clientData.email}</p>
//             </div>
//             <div className="CLIENTDETAILSform-group">
//               <label>Address:</label>
//               <p>{clientData.address || "N/A"}</p>
//             </div>
//             <div className="CLIENTDETAILSform-group">
//               <label>Phone:</label>
//               <p>{clientData.phone || "N/A"}</p>
//             </div>

//               <button onClick={onClose} className="save-button">
//                 Close
//               </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientDetails;

"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { User, Mail, MapPin, Phone, X } from "lucide-react"

const ClientDetails = ({ clientId, onClose }: { clientId: number; onClose: any }) => {
  const [clientData, setClientData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7156/api/Client/${clientId}`)
        setClientData(response.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setError("Failed to load client details")
        setLoading(false)
      }
    }

    fetchClientDetails()
  }, [clientId])

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

        {clientData && (
          <div className="client-details">
            <div className="client-avatar">
              <User size={40} />
            </div>

            <div className="client-info-group">
              <div className="client-info-item">
                <User className="client-info-icon" />
                <div className="client-info-content">
                  <label>שם:</label>
                  <p>{clientData.name}</p>
                </div>
              </div>

              <div className="client-info-item">
                <Mail className="client-info-icon" />
                <div className="client-info-content">
                  <label>דואר אלקטרוני:</label>
                  <p>{clientData.email}</p>
                </div>
              </div>

              <div className="client-info-item">
                <MapPin className="client-info-icon" />
                <div className="client-info-content">
                  <label>כתובת:</label>
                  <p>{clientData.address || "לא צוין"}</p>
                </div>
              </div>

              <div className="client-info-item">
                <Phone className="client-info-icon" />
                <div className="client-info-content">
                  <label>טלפון:</label>
                  <p>{clientData.phone || "לא צוין"}</p>
                </div>
              </div>
            </div>

            <button onClick={onClose} className="modal-button">
              סגור
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientDetails

