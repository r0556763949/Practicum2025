import React, { useEffect, useState } from "react";
import AddProjectModal from "./AddProjectModal";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedClient, setSelectedClient] = useState(null); // לקוח שנבחר להוספת פרויקט
  const [showModal, setShowModal] = useState(false); // הצגת חלון ההוספה

  useEffect(() => {
    // Fetch the list of clients from the server
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
  const handleAddProject = (client:any) => {
    setSelectedClient(client.id); // שמירת הלקוח הנבחר
    setShowModal(true); // הצגת חלון ההוספה
  };

  const closeModal = () => {
    setShowModal(false); // סגירת חלון ההוספה
    setSelectedClient(null); // ניקוי הלקוח הנבחר
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
              onClick={() => handleAddProject(client)}
              style={styles.button}
            >
              Add Project
            </button>
          </li>
        ))}
      </ul>
      {showModal && (
        <AddProjectModal
          client={selectedClient}
          onClose={closeModal}
          onSuccess={() => {
            closeModal(); // סגירת חלון לאחר שמירת הפרויקט
          }}
        />
      )}
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
