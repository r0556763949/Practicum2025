import  { useEffect, useState } from 'react';
import axios from 'axios';



const ClientDetails = ({ clientId, onClose }: { clientId:number, onClose:any }) => {
  const [clientData, setClientData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7156/api/Client/${clientId}`);
        setClientData(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load client details");
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [clientId]);

  return (
    <div className="CLIENTDETAILSmodal-overlay">
      <div className="CLIENTDETAILSmodal-container">
        <h2 className="CLIENTDETAILSmodal-title">Client Details</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="CLIENTDETAILSerror">{error}</p>}
        {clientData && (
          <div className="CLIENTDETAILSclient-details">
            <div className="CLIENTDETAILSform-group">
              <label>Name:</label>
              <p>{clientData.name}</p>
            </div>
            <div className="CLIENTDETAILSform-group">
              <label>Email:</label>
              <p>{clientData.email}</p>
            </div>
            <div className="CLIENTDETAILSform-group">
              <label>Address:</label>
              <p>{clientData.address || "N/A"}</p>
            </div>
            <div className="CLIENTDETAILSform-group">
              <label>Phone:</label>
              <p>{clientData.phone || "N/A"}</p>
            </div>

              <button onClick={onClose} className="save-button">
                Close
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;
