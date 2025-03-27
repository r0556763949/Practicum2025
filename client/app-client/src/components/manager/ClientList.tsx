
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientClick = (client) => {
    navigate(`/ClientPage/${client.id}`);
  };

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Client List</h1>
      <div style={styles.listContainer}>
        <ul style={styles.list}>
          {clients.map((client) => (
            <li key={client.id} style={styles.listItem}>
              <div style={styles.clientInfo}>
                <strong style={styles.clientName}>{client.name}</strong>
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
          <div style={styles.scrollContainer}>
            <p style={styles.scrollText}>Scroll for more...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    minWidth:"100vh"
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#003366",
  },
  listContainer: {
    maxHeight: "400px",
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
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
    backgroundColor: "#ffffff",
  },
  clientInfo: {
    fontSize: "16px",
    color: "#003366",
  },
  clientName: {
    fontWeight: "bold",
  },
  scrollContainer: {
    textAlign: "center",
    marginTop: "10px",
  },
  scrollText: {
    fontSize: "14px",
    color: "#888",
  },
};

export default ClientList;


