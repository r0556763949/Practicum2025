import React from "react";
import { useParams } from "react-router-dom";
import FileList from "../project/FileList";
import FileUpload from "../project/FileUpload";

const ProjectPage: React.FC = () => {
  const { clientId, projectId } = useParams<{ clientId: string; projectId: string }>();

  return (
    <div className="project-page-container">
      <div className="project-page-content">
        <FileList clientId={parseInt(clientId!)} projectId={parseInt(projectId!)} />
      </div>

      <div className="project-page-actions">
        <FileUpload clientId={parseInt(clientId!)} projectId={parseInt(projectId!)} />
      </div>
    </div>
  );
};

export default ProjectPage;
