import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FileList from "../project/FileList";
import FileUpload from "../project/FileUpload";
import decodeToken from "../../centeral/authUtils";
import FilePreview from "../project/FilePreview";

const ProjectPage: React.FC = () => {
  const { clientId, projectId } = useParams<{ clientId: string; projectId: string }>();
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  let isManager = false;
  const token = sessionStorage.getItem("token");
  if (token) {
    const decoded = decodeToken(token);
    if (decoded) {
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      isManager = role === "Manager";
    }
  }

  return (
    <div className="project-page-container">
      <div className="project-page-content">
        <FileList clientId={parseInt(clientId!)} projectId={parseInt(projectId!)} onFileSelect={setSelectedFileId} />
      </div>

      <div className="project-page-actions">
        {!isManager && <FilePreview 
          clientId={parseInt(clientId!)}
          projectId={parseInt(projectId!)}
          fileId={selectedFileId} />}
        {isManager && <FileUpload clientId={parseInt(clientId!)} projectId={parseInt(projectId!)} />}
      </div>
    </div>
  );
};

export default ProjectPage;
