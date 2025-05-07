// import React, { useState } from "react";
// import { deleteFile, downloadFile, viewFile } from "../../store/FileSlice"; // ודא שהנתיב נכון
// import { AppDispatch } from "../../store/Store";  // ודא שהיבוא נכון
// import { useDispatch } from "react-redux";
// import '../../../styles/Remark.css';
// import decodeToken from "../../centeral/authUtils";


// interface FileActionsPanelProps {
//   clientId: number;
//   projectId: number;
//   fileId: number;
// }

// const FileActionsPanel: React.FC<FileActionsPanelProps> = ({ clientId, projectId, fileId }) => {
//   // השתמש ב-AppDispatch מתוך ה-Store שלך
//   const dispatch = useDispatch<AppDispatch>();

//   // מצב לשמירת התוצאה של הפעולות
//   const [actionStatus, setActionStatus] = useState<{
//     success: boolean | null;
//     message: string;
//   }>({ success: null, message: "" });

//   let isManager = false;
//   const token = sessionStorage.getItem("token"); // או מאיפה שאתה שומר את הטוקן
//   if (token) {
//     const decoded = decodeToken(token);
//     if (decoded) {
//       const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
//       isManager = role === "Manager";
//     }
//   }

//   // פונקציות לטיפול בכפתורים
//   const handleDeleteFile = async () => {
//     try {
//       await dispatch(deleteFile({ clientId, projectId, id: fileId }));
//       setActionStatus({ success: true, message: "File deleted successfully" });
//     } catch (error) {
//       setActionStatus({ success: false, message: "Failed to delete file" });
//     }
//   };

//   const handleUpdateFile = () => {
//     console.log("Update File");
//   };

//   const handleViewFile = async () => {
//     try {
//       await dispatch(viewFile({ clientId, projectId, id: fileId }));
//       setActionStatus({ success: true, message: "File viewed successfully" });
//     } catch (error) {
//       setActionStatus({ success: false, message: "Failed to view file" });
//     }
//   };

//   const handleDownloadFile = async () => {
//     try {
//       await dispatch(downloadFile({ clientId, projectId, id: fileId }));
//       setActionStatus({ success: true, message: "File downloaded successfully" });
//     } catch (error) {
//       setActionStatus({ success: false, message: "Failed to download file" });
//     }
//   };

//   return (
//     <div className="FileActions-rightPanel">
//       {actionStatus.message && (
//         <p
//           className={`action-status ${actionStatus.success ? "success" : "error"}`}
//         >
//           {actionStatus.message}
//         </p>
//       )}
//       {isManager && (
//         <button className="primary-button" onClick={handleDeleteFile}>
//           Delete File
//         </button>)}
//       {isManager && (
//         <button className="primary-button" onClick={handleUpdateFile}>
//           Update File
//         </button>
//       )}

//       <button className="primary-button" onClick={handleViewFile}>
//         View File
//       </button>
//       <button className="primary-button" onClick={handleDownloadFile}>
//         Download File
//       </button>
//     </div>
//   );
// };

// export default FileActionsPanel;

"use client"

import { useState } from "react"
import { deleteFile, downloadFile, viewFile } from "../../store/FileSlice"
import type { AppDispatch } from "../../store/Store"
import { useDispatch } from "react-redux"
import decodeToken from "../../centeral/authUtils"
import { Download, Eye, Trash2, AlertCircle, CheckCircle, Edit } from "lucide-react"

interface FileActionsPanelProps {
  clientId: number
  projectId: number
  fileId: number
}

const FileActionsPanel = ({ clientId, projectId, fileId }: FileActionsPanelProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [actionStatus, setActionStatus] = useState<{
    success: boolean | null
    message: string
    loading: boolean
  }>({ success: null, message: "", loading: false })

  let isManager = false
  const token = sessionStorage.getItem("token")
  if (token) {
    const decoded = decodeToken(token)
    if (decoded) {
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      isManager = role === "Manager"
    }
  }

  const handleDeleteFile = async () => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק קובץ זה?")) {
      try {
        setActionStatus({ success: null, message: "", loading: true })
        await dispatch(deleteFile({ clientId, projectId, id: fileId }))
        setActionStatus({ success: true, message: "הקובץ נמחק בהצלחה", loading: false })
      } catch (error) {
        setActionStatus({ success: false, message: "שגיאה במחיקת הקובץ", loading: false })
      }
    }
  }

  const handleUpdateFile = () => {
    // Logic for updating file would go here
    console.log("Update File")
  }

  const handleViewFile = async () => {
    try {
      setActionStatus({ success: null, message: "", loading: true })
      await dispatch(viewFile({ clientId, projectId, id: fileId }))
      setActionStatus({ success: true, message: "הקובץ נפתח בהצלחה", loading: false })
    } catch (error) {
      setActionStatus({ success: false, message: "שגיאה בפתיחת הקובץ", loading: false })
    }
  }

  const handleDownloadFile = async () => {
    try {
      setActionStatus({ success: null, message: "", loading: true })
      await dispatch(downloadFile({ clientId, projectId, id: fileId }))
      setActionStatus({ success: true, message: "הקובץ הורד בהצלחה", loading: false })
    } catch (error) {
      setActionStatus({ success: false, message: "שגיאה בהורדת הקובץ", loading: false })
    }
  }

  return (
    <div className="file-actions">
      {actionStatus.message && (
        <div className={`action-status ${actionStatus.success ? "success" : "error"}`}>
          {actionStatus.success ? (
            <CheckCircle className="status-icon success" />
          ) : (
            <AlertCircle className="status-icon error" />
          )}
          <p>{actionStatus.message}</p>
        </div>
      )}

      <div className="actions-group">
        <button
          className={`action-button view ${actionStatus.loading ? "loading" : ""}`}
          onClick={handleViewFile}
          disabled={actionStatus.loading}
        >
          {actionStatus.loading ? <span className="loading-spinner"></span> : <Eye className="action-icon" />}
          <span>צפייה בקובץ</span>
        </button>

        <button
          className={`action-button download ${actionStatus.loading ? "loading" : ""}`}
          onClick={handleDownloadFile}
          disabled={actionStatus.loading}
        >
          {actionStatus.loading ? <span className="loading-spinner"></span> : <Download className="action-icon" />}
          <span>הורדת קובץ</span>
        </button>

        {isManager && (
          <>
            <button
              className={`action-button edit ${actionStatus.loading ? "loading" : ""}`}
              onClick={handleUpdateFile}
              disabled={actionStatus.loading}
            >
              {actionStatus.loading ? <span className="loading-spinner"></span> : <Edit className="action-icon" />}
              <span>עדכון קובץ</span>
            </button>

            <button
              className={`action-button delete ${actionStatus.loading ? "loading" : ""}`}
              onClick={handleDeleteFile}
              disabled={actionStatus.loading}
            >
              {actionStatus.loading ? <span className="loading-spinner"></span> : <Trash2 className="action-icon" />}
              <span>מחיקת קובץ</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default FileActionsPanel

