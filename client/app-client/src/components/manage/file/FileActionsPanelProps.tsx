import React, { useState } from "react";
import { deleteFile, downloadFile, viewFile } from "../../store/FileSlice"; // ודא שהנתיב נכון
import {  AppDispatch } from "../../store/Store";  // ודא שהיבוא נכון
import { useDispatch } from "react-redux";
import '../../../styles/Remark.css';


interface FileActionsPanelProps {
  clientId: number;
  projectId: number;
  fileId: number;
}

const FileActionsPanel: React.FC<FileActionsPanelProps> = ({ clientId, projectId, fileId }) => {
  // השתמש ב-AppDispatch מתוך ה-Store שלך
  const dispatch = useDispatch<AppDispatch>();

  // מצב לשמירת התוצאה של הפעולות
  const [actionStatus, setActionStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({ success: null, message: "" });

  // פונקציות לטיפול בכפתורים
  const handleDeleteFile = async () => {
    try {
      await dispatch(deleteFile({ clientId, projectId, id: fileId }));
      setActionStatus({ success: true, message: "File deleted successfully" });
    } catch (error) {
      setActionStatus({ success: false, message: "Failed to delete file" });
    }
  };

  const handleUpdateFile = () => {
    console.log("Update File");
  };

  const handleViewFile = async () => {
    try {
      await dispatch(viewFile({ clientId, projectId, id: fileId }));
      setActionStatus({ success: true, message: "File viewed successfully" });
    } catch (error) {
      setActionStatus({ success: false, message: "Failed to view file" });
    }
  };

  const handleDownloadFile = async () => {
    try {
      await dispatch(downloadFile({ clientId, projectId, id: fileId }));
      setActionStatus({ success: true, message: "File downloaded successfully" });
    } catch (error) {
      setActionStatus({ success: false, message: "Failed to download file" });
    }
  };

  return (
    <div className="FileActions-rightPanel">
      {actionStatus.message && (
        <p
          className={`action-status ${actionStatus.success ? "success" : "error"}`}
        >
          {actionStatus.message}
        </p>
      )}
      <button className="primary-button" onClick={handleDeleteFile}>
        Delete File
      </button>
      <button className="primary-button" onClick={handleUpdateFile}>
        Update File
      </button>
      <button className="primary-button" onClick={handleViewFile}>
        View File
      </button>
      <button className="primary-button" onClick={handleDownloadFile}>
        Download File
      </button>
    </div>
  );
};

export default FileActionsPanel;
