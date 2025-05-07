// import React, { useEffect } from "react";
// import '../../../styles/FilePreview.css';
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/Store";
// import { fetchFileUrl } from "../../store/FileSlice";
// import { useNavigate } from "react-router-dom";

// interface FilePreviewProps {
//     clientId: number;
//     projectId: number;
//     fileId: number | null;
// }

// const FilePreview: React.FC<FilePreviewProps> = ({ clientId, projectId, fileId }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const fileUrl = useSelector((state: RootState) => state.files.selectedFileUrl); // מתוך ה-slice
//     const loading = useSelector((state: RootState) => state.files.loading);
//     const error = useSelector((state: RootState) => state.files.error);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (fileId) {
//             console.log("fileId of view: ", fileId);
//             dispatch(fetchFileUrl({ clientId, projectId, id: fileId })); // פעולה שמביאה את ה-url מהשרת
//         }
//     }, [dispatch, clientId, projectId, fileId]);

//     // const handleManageFile = () => {
//     //     if (fileId !== null) {
//     //         navigate(`FilePage/${fileId}`);
//     //     }
//     // };

//     return (
//         <div className="file-preview-panel">
//             {loading && <p>טוען...</p>}
//             {/* {fileUrl && <button
//                 onClick={handleManageFile}
//                 className="manage-file-button"
//                 style={{
//                     marginTop: '2px',
//                     padding: '10px 20px',
//                     backgroundColor: '#007bff',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer'
//                 }}
//             >
//                 מעבר לקובץ
//             </button>} */}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {fileUrl && (
//                 <iframe
//                     src={fileUrl}
//                     title="תצוגת קובץ"
//                     width="100%"
//                     height="600px"
//                     style={{ border: '1px solid #ccc' }}
//                 />
//             )}
//             {!loading && !fileUrl && <p>אין קובץ להצגה</p>}
//         </div>
//     );
// };

// export default FilePreview;

"use client"

import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/Store"
import { fetchFileUrl } from "../../store/FileSlice"
import { FileText, Loader, AlertCircle } from "lucide-react"

interface FilePreviewProps {
  clientId: number
  projectId: number
  fileId: number | null
}

const FilePreview = ({ clientId, projectId, fileId }: FilePreviewProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const fileUrl = useSelector((state: RootState) => state.files.selectedFileUrl)
  const loading = useSelector((state: RootState) => state.files.loading)
  const error = useSelector((state: RootState) => state.files.error)
  const [currentProjectName, setCurrentProjectName] = useState<string>("")
  const projects = useSelector((state: RootState) => state.projects.projects) // Moved useSelector here

  const getCurrentProjectName = useCallback(() => {
    const currentProject = projects.find((p) => p.id === projectId)
    if (currentProject) {
      setCurrentProjectName(currentProject.description || "")
    }
  }, [projects, projectId])

  useEffect(() => {
    if (fileId) {
      dispatch(fetchFileUrl({ clientId, projectId, id: fileId }))
    }

    getCurrentProjectName()
  }, [dispatch, clientId, projectId, fileId, getCurrentProjectName])

  return (
    <div className="file-preview-container">
      {/* {currentProjectName && (
        <div className="file-preview-project">
          <span>פרויקט: {currentProjectName}</span>
        </div>
      )} */}

      {loading && (
        <div className="file-preview-loading">
          <Loader className="loading-icon" />
          <p>טוען קובץ...</p>
        </div>
      )}

      {error && (
        <div className="file-preview-error">
          <AlertCircle className="error-icon" />
          <p>{error}</p>
        </div>
      )}

      {!loading && !fileUrl && !error && (
        <div className="file-preview-empty">
          <FileText className="empty-icon" />
          <p>אין קובץ להצגה</p>
        </div>
      )}

      {fileUrl && (
        <div className="file-preview-frame" >
          <iframe src={fileUrl} title="תצוגת קובץ" className="file-iframe" />
        </div>
      )}
    </div>
  )
}

export default FilePreview

