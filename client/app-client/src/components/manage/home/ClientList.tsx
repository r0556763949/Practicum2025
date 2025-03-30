import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientDto } from "../../store/interfaces";
import CreateClient from "../../popaps/CreateClient";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("https://localhost:7156/api/Client", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }

      const data = await response.json();
      setClients(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };


  const handleDeleteClient = async (clientId: number) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        const response = await fetch(`https://localhost:7156/api/Client/${clientId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete client");
        }

        setClients((prevClients) => prevClients.filter((client:any) => client.id !== clientId));
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleClientClick = (client: ClientDto) => {
    navigate(`/ClientPage/${client.id}`);
  };

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p style={{ color: "red", fontSize: "12px" }}>{error}</p>;

  return (
    <div className="ClientList-container">
      <button
        className="primary-button"
        onClick={() => setIsPopupOpen(true)}
        style={{ marginTop: "20px" }}
      >
        הוסף לקוח
      </button>
      {isPopupOpen && <CreateClient onClose={() => { setIsPopupOpen(false); fetchClients(); }} />}
      <h1 className="title">Client List</h1>
      <div className="listContainer">
        <ul className="list">
          {clients.map((client: ClientDto) => (
            <li key={client.id} className="listItem">
              <div className="clientInfo">
                <strong className="clientName">{client.name}</strong>
              </div>
              <div>
                <button onClick={() => handleDeleteClient(client.id)} className="primary-button">
                  Delete
                </button>
                <button
                  onClick={() => handleClientClick(client)}
                  className="primary-button"
                >
                  View Client
                </button>
              </div>
            </li>
          ))}
        </ul>
        {clients.length > 10 && (
          <div className="scrollContainer">
            <p className="scrollText">Scroll for more...</p>
          </div>
        )}
      </div>
    </div>
  );
};



export default ClientList;



