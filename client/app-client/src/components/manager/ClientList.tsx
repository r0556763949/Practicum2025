import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientDto } from "../interfaces";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
      } catch (err:any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientClick = (client:ClientDto) => {
    navigate(`/ClientPage/${client.id}`);
  };

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p style={{ color: "red", fontSize: "12px" }}>{error}</p>;

  return (
<div className="ClientList-container">
  <h1 className="title">Client List</h1>
  <div className="listContainer">
    <ul className="list">
      {clients.map((client: ClientDto) => (
        <li key={client.id} className="listItem">
          <div className="clientInfo">
            <strong className="clientName">{client.name}</strong>
          </div>
          <button
            onClick={() => handleClientClick(client)}
            className="primary-button"
          >
            View Client
          </button>
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



