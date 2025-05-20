// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { comparePlans, fetchFiles } from "../../store/FileSlice";
// import { RootState, AppDispatch } from "../../store/Store";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const FileList: React.FC<{ clientId: number; projectId: number; onFileSelect: (fileId: number) => void; }> = ({
//   clientId,
//   projectId,
//   onFileSelect,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();


//   const { files, loading, error } = useSelector(
//     (state: RootState) => state.files
//   );
//   const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
//   const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
//   const [diffImage, setDiffImage] = useState<string | null>(null);

//   const handleFileClick = (fileId: number) => {
//     // navigate(`FilePage/${fileId}`);
//     onFileSelect(fileId);
//     setSelectedFileId(fileId)
//   };

//   const handleDoubleClick = (fileId: number) => {
//     navigate(`FilePage/${fileId}`);
//   };

//   useEffect(() => {
//     dispatch(fetchFiles({ clientId, projectId }));
//   }, [dispatch, clientId, projectId]);


//   // const toggleSelection = (id: number) => {
//   //   setDiffImage(null); // ננקה תוצאה ישנה
//   //   setSelectedFiles((prev) =>
//   //     prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
//   //   );
//   // };

//   // const handleCompare = async () => {
//   //   if (selectedFiles.length !== 2) return;
//   //   const [id1, id2] = selectedFiles;
//   //   const result = await dispatch(comparePlans({
//   //     clientId,
//   //     projectId,
//   //     fileId1: id1,
//   //     fileId2: id2
//   //   }));
//   //   if (comparePlans.fulfilled.match(result)) {
//   //     const blobUrl = URL.createObjectURL(result.payload);
//   //     setDiffImage(blobUrl);
//   //   }
//   // };
//   // const handleCompare = async () => {
//   //   if (selectedFiles.length !== 2) return;
//   //   const [id1, id2] = selectedFiles;

//   //   try {
//   //     // קריאה ישירה בלי Redux
//   //     const response = await axios.get(
//   //       `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/compare-plans/${id1}/${id2}`,
//   //       { responseType: 'blob' }
//   //     );
//   //     console.log(response.data);
      
//   //     const blobUrl = URL.createObjectURL(response.data);
//   //     setDiffImage(blobUrl);
//   //   } catch (error) {
//   //     console.error('Comparison failed', error);
//   //   }
//   // };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (<>
//     <h2 className="title">Project Files</h2>
//     <div className="file-list">
//       {files.map((file) => (
//         <div
//           key={file.id}
//           className={`file-item ${selectedFileId === file.id ? 'selected' : ''}`}
//           onClick={() => handleFileClick(file.id)} // לחיצה על קובץ
//           onDoubleClick={() => handleDoubleClick(file.id)}
//           // onClick={() => toggleSelection(file.id)}
//         >
//           <div className="file-content">
//             <div className="file-name">{file.name}</div>
//             <div className="file-description">{file.description}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//     {/* {selectedFiles.length === 2 && (
//       <button className="compare-btn" onClick={handleCompare}>
//         Compare Selected Plans
//       </button>
//     )} */}

//     {/* {diffImage && (
//       <img
//         src={diffImage}
//         alt="Comparison result"
//         style={{
//           maxWidth: '400px', // או כל רוחב שמתאים לך
//           maxHeight: '400px',
//           objectFit: 'contain', // חשוב – מתאים את התמונה לגודל מבלי לחתוך
//           border: '1px solid #ccc',
//         }}
//       />
//     )} */}
//   </>
//   );
// };

// export default FileList;

"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFiles } from "../../store/FileSlice"
import type { RootState, AppDispatch } from "../../store/Store"
import { useNavigate } from "react-router-dom"
import { FileText, Folder, Loader } from "lucide-react"

interface FileListProps {
  clientId: number
  projectId: number
  onFileSelect: (fileId: number) => void
}

const FileList = ({ clientId, projectId, onFileSelect }: FileListProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { files, loading, error } = useSelector((state: RootState) => state.files)
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null)

  const handleFileClick = (fileId: number) => {
    onFileSelect(fileId)
    setSelectedFileId(fileId)
  }

  const handleDoubleClick = (fileId: number) => {
    navigate(`FilePage/${fileId}`)
  }

  useEffect(() => {
    dispatch(fetchFiles({ clientId, projectId }))
  }, [dispatch, clientId, projectId])

  if (loading)
    return (
      <div className="file-list-loading">
        <Loader className="loading-icon" />
        <p>טוען קבצים...</p>
      </div>
    )

  if (error)
    return (
      <div className="file-list-error">
        <p>{error}</p>
      </div>
    )

  return (
    <div className="file-list-container">
      {files.length === 0 ? (
        <div className="file-list-empty">
          <Folder className="empty-icon" />
          <p>אין קבצים בפרויקט זה</p>
        </div>
      ) : (
        <div className="file-grid">
          {files.map((file) => (
            <div
              key={file.id}
              className={`file-card ${selectedFileId === file.id ? "selected" : ""}`}
              onClick={() => handleFileClick(file.id)}
              onDoubleClick={() => handleDoubleClick(file.id)}
            >
              <div className="file-card-icon">
                <FileText />
              </div>
              <div className="file-card-content">
                <h4 className="file-card-name">{file.name}</h4>
                <p className="file-card-description">{file.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FileList

