
import React from "react";
import { useParams } from "react-router-dom";
import FileActionsPanel from "../file/FileActionsPanelProps"
import RemarksComponent from "../file/ReMarks";

const FilePage: React.FC = () => {
  const { projectId, fileId, clientId } = useParams<{
    projectId: string;
    fileId: string;
    clientId: string;
  }>();

  return (
    <div className="file-page-container">
      <div className="file-page-content">
        <RemarksComponent
          fileId={Number(fileId)}
          clientId={Number(clientId)}
        />
      </div>
      <div className="file-page-actions">
        <FileActionsPanel
          clientId={Number(clientId)}
          projectId={Number(projectId)}
          fileId={Number(fileId)}
        />
      </div>
    </div>
  );
};

export default FilePage;

