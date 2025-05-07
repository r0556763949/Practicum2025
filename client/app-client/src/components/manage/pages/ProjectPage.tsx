// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import FileList from "../project/FileList";
// import FileUpload from "../project/FileUpload";
// import decodeToken from "../../centeral/authUtils";
// import FilePreview from "../project/FilePreview";

// const ProjectPage: React.FC = () => {
//   const { clientId, projectId } = useParams<{ clientId: string; projectId: string }>();
//   const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
//   let isManager = false;
//   const token = sessionStorage.getItem("token");
//   if (token) {
//     const decoded = decodeToken(token);
//     if (decoded) {
//       const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
//       isManager = role === "Manager";
//     }
//   }

//   return (
//     <div className="project-page-container">
//       <div className="project-page-content">
//         <FileList clientId={parseInt(clientId!)} projectId={parseInt(projectId!)} onFileSelect={setSelectedFileId} />
//       </div>

//       <div className="project-page-actions">
//         {!isManager && <FilePreview 
//           clientId={parseInt(clientId!)}
//           projectId={parseInt(projectId!)}
//           fileId={selectedFileId} />}
//         {isManager && <FileUpload clientId={parseInt(clientId!)} projectId={parseInt(projectId!)} />}
//       </div>
//     </div>
//   );
// };

// export default ProjectPage;

"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import FileList from "../project/FileList"
import FileUpload from "../project/FileUpload"
import decodeToken from "../../centeral/authUtils"
import FilePreview from "../project/FilePreview"
import { FileText, Upload } from "lucide-react"

const ProjectPage = () => {
  const { clientId, projectId } = useParams<{ clientId: string; projectId: string }>()
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null)

  let isManager = false
  const token = sessionStorage.getItem("token")
  if (token) {
    const decoded = decodeToken(token)
    if (decoded) {
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      isManager = role === "Manager"
    }
  }

  return (
    <div className="project-page">
      <div className="project-content">
        <div className="project-files-header">
          <FileText className="section-icon" />
          <h2 className="section-title">קבצי פרויקט</h2>
        </div>
        <FileList
          clientId={Number.parseInt(clientId!)}
          projectId={Number.parseInt(projectId!)}
          onFileSelect={setSelectedFileId}
        />
      </div>

      <div className="project-sidebar">
        {!isManager && selectedFileId && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">תצוגה מקדימה</h3>
            <FilePreview
              clientId={Number.parseInt(clientId!)}
              projectId={Number.parseInt(projectId!)}
              fileId={selectedFileId}
            />
          </div>
        )}

        {isManager && (
          <div className="sidebar-section">
            <div className="sidebar-header">
              <Upload className="sidebar-icon" />
              <h3 className="sidebar-title">העלאת קובץ</h3>
            </div>
            <FileUpload clientId={Number.parseInt(clientId!)} projectId={Number.parseInt(projectId!)} />
          </div>
        )}

        {!selectedFileId && !isManager && (
          <div className="empty-state">
            <FileText className="empty-icon" />
            <p>בחר קובץ כדי להציג תצוגה מקדימה</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectPage

