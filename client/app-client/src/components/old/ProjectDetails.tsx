import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PogramFile from "../PogramFile";

const ProjectDetails = () => {
  const { clientId, projectId } = useParams();
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch project details
  const fetchProjectDetails = async () => {
    try {
      const projectResponse = await fetch(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}`
      );

      if (!projectResponse.ok) {
        throw new Error("Failed to fetch project details.");
      }

      const projectData = await projectResponse.json();
      setProject(projectData);

      const filesResponse = await fetch(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files`
      );

      if (!filesResponse.ok) {
        throw new Error("Failed to fetch project files.");
      }

      const filesData = await filesResponse.json();
      setFiles(filesData);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [clientId, projectId]);

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Project Details</h2>
      {project && (
        <div style={styles.projectInfo}>
          <p>
            <strong>Description:</strong> {project.description}
          </p>
          <p>
            <strong>Address:</strong> {project.address}
          </p>
          <p>
            <strong>Start Date:</strong> {project.startAt}
          </p>
        </div>
      )}

      <h3>Files</h3>
      <PogramFile clientId={clientId} projectId={projectId}/>
      {files.length > 0 ? (
        <ul style={styles.fileList}>
          {files.map((file) => (
            <li key={file.id}>
              <strong>{file.name}</strong>: {file.description || "No description"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No files found for this project.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  projectInfo: {
    marginBottom: "20px",
  },
  fileList: {
    listStyleType: "none",
    padding: 0,
  },
};

export default ProjectDetails;
