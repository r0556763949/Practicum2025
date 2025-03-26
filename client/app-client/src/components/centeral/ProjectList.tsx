import React, { useEffect, useState } from "react";

const ProjectList = ({ clientId}:{ clientId:any }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientProjects = async () => {
      try {
        const response = await fetch(
          `https://localhost:7156/api/clients/${clientId}/projects`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch client details");
        }

        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClientProjects();
  }, [clientId]);
  const handleViewProject = (projectId: any) => {
    console.log("view: ", projectId);

    // navigate(`/client/${clientId}/project/${projectId}`);
};
  if (loading) return <p>Loading projects...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h3>Projects:</h3>
      <div style={styles.listContainer}>
        <ul style={styles.list}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} style={styles.listItem}>
                <button
                  style={styles.projectButton}
                  onClick={() => handleViewProject(project.id)}
                >
                  {project.description}
                </button>
              </li>
            ))
          ) : (
            <p>No projects found for this client.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

const styles = {
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
  projectButton: {
    padding: "10px 15px",
    fontSize: "14px",
    cursor: "pointer",
    width: "100%",
    backgroundColor: "#003366",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

export default ProjectList;
