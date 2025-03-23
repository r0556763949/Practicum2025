import React, { useEffect, useState } from "react";
import AddProjectModal from "./AddProjectModal";
import ClientProjects from "./ClientProjects";
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedClient, setSelectedClient] = useState(null); // לקוח שנבחר לרשימת פרויקט
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
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);
  const handleProjects = (client:any) => {
    console.log("ClientList: handleProjects:  client:  ",client);
    
    navigate(`/projects/${client.id}`);
  };



  if (loading) return <p>Loading clients...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Client List</h1>
      <ul style={styles.list}>
        {clients.map((client) => (
          <li key={client.id} style={styles.listItem}>
            <div>
              <strong>Name:</strong> {client.name} <br />
              <strong>Email:</strong> {client.email}
            </div>
            <button
              onClick={() => handleProjects(client)}
              style={styles.button}
            >
               Projects
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ClientList;
