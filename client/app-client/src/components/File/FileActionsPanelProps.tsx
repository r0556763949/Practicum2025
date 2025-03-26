import React from "react";
import { deleteFile, downloadFile, viewFile } from "../store/FileSlice"; // ודא שהנתיב נכון
import { RootState, AppDispatch } from "../store/Store";  // ודא שהיבוא נכון
import { useDispatch, useSelector } from "react-redux";

interface FileActionsPanelProps {
  clientId: number;
  projectId: number;
  fileId: number;
}

const FileActionsPanel: React.FC<FileActionsPanelProps> = ({ clientId, projectId, fileId }) => {
  // השתמש ב-AppDispatch מתוך ה-Store שלך
  const dispatch = useDispatch<AppDispatch>();

  // פונקציות לטיפול בכפתורים
  const handleDeleteFile = () => {
    dispatch(deleteFile({ clientId, projectId, id: fileId }));
  };

  const handleUpdateFile = () => {
    console.log("Update File");
  };

  const handleViewFile = () => {
    console.log("handleViewFile");
    
    dispatch(viewFile({ clientId, projectId, id: fileId }));
  };

  const handleDownloadFile = () => {
    console.log("handleDownloadFile");
    
    dispatch(downloadFile({ clientId, projectId, id: fileId }));
  };

  return (
    <div style={styles.rightPanel}>
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

const styles = {
  rightPanel: {
    width: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
};

export default FileActionsPanel;
