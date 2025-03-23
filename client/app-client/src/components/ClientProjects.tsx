import React, { useEffect, useState } from "react";
import AddProjectModal from "./AddProjectModal";
import { useParams } from "react-router-dom";

const ClientProjects = () => {
    const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const fetchProjects = async () => {
    console.log("ClientProjects: fetchProjects: id: ",id);
    try {
      const response = await fetch(
        `https://localhost:7156/api/clients/${id}/projects`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log(response);
        
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [id]);
  const handleAddProjectSuccess = () => {
    setShowAddModal(false);
    // רענון רשימת הפרויקטים לאחר הוספה
    setLoading(true);
    fetchProjects();
  };
  if (loading) return <p>Loading projects...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Projects for {id}</h2>
        <button
          onClick={() => setShowAddModal(true)} // שינוי: פתיחת חלון הוספה
          style={styles.addButton}
        >
          Add Project
        </button>
      </div>
      <ul style={styles.list}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project.id} style={styles.listItem}>
              <strong>Project:</strong> {project.description}
            </li>
          ))
        ) : (
          <p>No projects found for this client.</p>
        )}
      </ul>
      {showAddModal && (
        <AddProjectModal
          client={id}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddProjectSuccess}
        />
      )}
    </div>
  );
};

export default ClientProjects;

// עיצוב בסיסי
const styles = {
  container: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    zIndex: 1000,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    margin: 0,
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 15px",
    cursor: "pointer",
  },
  closeButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    borderBottom: "1px solid #ccc",
    padding: "10px 0",
  },
};
