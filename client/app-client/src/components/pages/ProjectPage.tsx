import React from "react";
import FileList from "../File/FileList"
import { useParams } from "react-router-dom";
import FileUpload from "../File/FileUpload"

const ProjectPage: React.FC = () => {
    const { clientId, projectId } = useParams<{ clientId: string; projectId: string }>()
  return (
    <div style={styles.container}>
     
      <div style={styles.leftPanel}>
      <FileUpload clientId={parseInt(clientId!)} projectId={parseInt(projectId!)}/>ד
        <div style={styles.placeholder}>Left Panel (Future Component)</div>
      </div>

      {/* מרכז - רשימת הקבצים */}
      <div style={styles.centerPanel}>
        <h2 style={styles.title}>Project Files</h2>
        <FileList clientId={parseInt(clientId!)} projectId={parseInt(projectId!)} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  leftPanel: {
    width: "20%",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRight: "1px solid #ddd",
  },
  centerPanel: {
    width: "80%",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  placeholder: {
    textAlign: "center",
    color: "#aaa",
    fontStyle: "italic",
    padding: "20px",
    border: "1px dashed #ccc",
    borderRadius: "8px",
  },
  title: {
    fontSize: "24px",
    color: "#003366",
    marginBottom: "20px",
  },
};

export default ProjectPage;
