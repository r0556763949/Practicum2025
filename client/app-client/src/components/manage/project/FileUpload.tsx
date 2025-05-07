// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUploadUrl, confirmUpload } from "../../store/FileSlice";
// import { AppDispatch, RootState } from "../../store/Store";


// const FileUpload: React.FC<{ clientId: number; projectId: number }> = ({ clientId, projectId }) => {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [description, setDescription] = useState("");
//     const [uploadStatus, setUploadStatus] = useState<{ success: boolean | null; message: string }>({
//         success: null,
//         message: "",
//     });
//     const dispatch = useDispatch<AppDispatch>();
//     const { loading, error } = useSelector((state: RootState) => state.files);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setSelectedFile(e.target.files[0]);
//         }
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             setUploadStatus({ success: false, message: "Please select a file!" });
//             return;
//         }
//         if (!description.trim()) {
//             setUploadStatus({ success: false, message: "Please add a description!" });
//             return;
//         }

//         try {
//             const { uploadUrl, filePath } = await dispatch(
//                 getUploadUrl({
//                     clientId,
//                     projectId,
//                     name: JSON.stringify(selectedFile.name),
//                 })
//             ).unwrap();

//             const uploadResponse = await fetch(uploadUrl, {
//                 method: "PUT",
//                 body: selectedFile,
//             });

//             if (!uploadResponse.ok) {
//                 throw new Error("Failed to upload file to S3.");
//             }

//             await dispatch(
//                 confirmUpload({
//                     clientId,
//                     projectId,
//                     request: {
//                         fileName: selectedFile.name,
//                         description,
//                         filePath,
//                     },
//                 })
//             ).unwrap();

//             setUploadStatus({ success: true, message: "File uploaded successfully!" });
//             setSelectedFile(null);
//             setDescription("");
//         } catch (err) {
//             console.error("An error occurred:", err);
//             setUploadStatus({ success: false, message: "Failed to upload file. Please try again." });
//         }
//     };

//     return (
//         <form className="medium-form">
//             <h1 className="big-letter-blue">העלאת קובץ</h1>

//             <div className="inputGroup">
//                 {selectedFile && <label className="label">קובץ</label>}
//                 <div className="file-input-wrapper">
//                     {!selectedFile ? (
//                         <label htmlFor="file" className="primary-button file-button">
//                             בחר קובץ
//                         </label>
//                     ) : (
//                         <div className="input file-name-display">{selectedFile.name}</div>
//                     )}
//                     <input
//                         type="file"
//                         id="file"
//                         onChange={handleFileChange}
//                        className="hiddenInput"
//                     />
//                 </div>
//             </div>

//             <div className="inputGroup">
//                 <label className="label">תיאור הקובץ</label>
//                 <input
//                     type="text"
//                     placeholder="Enter a description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="input"
//                     required
//                 />
//             </div>

//             <button
//                 type="button"
//                 onClick={handleUpload}
//                 className={`primary-button`}
//                 disabled={loading}
//                 style={{ position: "relative", display: "inline-block", width: "100%" }}
//             >
//                 {loading ? (
//                     <div className="loader-container">
//                         <div className="loader"></div>
//                     </div>
//                 ) : (
//                     "Upload"
//                 )}
//             </button>

//             {/* הודעה למצב העלאה */}
//             {uploadStatus.message && (
//                 <p
//                     className={`upload-status ${uploadStatus.success ? "success" : "error"} uploadStatus` }
//                 >
//                     {uploadStatus.message}
//                 </p>
//             )}

//             {error && (
//                 <p className="small-letter-blue error">
//                     {error}
//                 </p>
//             )}
//         </form>
//     );
// };


// export default FileUpload;

"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUploadUrl, confirmUpload } from "../../store/FileSlice"
import type { AppDispatch, RootState } from "../../store/Store"
import { FileUp, FileText, Upload, AlertCircle, CheckCircle } from "lucide-react"

const FileUpload = ({ clientId, projectId }: { clientId: number; projectId: number }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [uploadStatus, setUploadStatus] = useState<{ success: boolean | null; message: string }>({
    success: null,
    message: "",
  })
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.files)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({ success: false, message: "יש לבחור קובץ" })
      return
    }
    if (!description.trim()) {
      setUploadStatus({ success: false, message: "יש להוסיף תיאור לקובץ" })
      return
    }

    try {
      const { uploadUrl, filePath } = await dispatch(
        getUploadUrl({
          clientId,
          projectId,
          name: JSON.stringify(selectedFile.name),
        }),
      ).unwrap()

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: selectedFile,
      })

      if (!uploadResponse.ok) {
        throw new Error("שגיאה בהעלאת הקובץ")
      }

      await dispatch(
        confirmUpload({
          clientId,
          projectId,
          request: {
            fileName: selectedFile.name,
            description,
            filePath,
          },
        }),
      ).unwrap()

      setUploadStatus({ success: true, message: "הקובץ הועלה בהצלחה!" })
      setSelectedFile(null)
      setDescription("")
    } catch (err) {
      console.error("An error occurred:", err)
      setUploadStatus({ success: false, message: "שגיאה בהעלאת הקובץ. נסה שוב." })
    }
  }

  return (
    <div className="file-upload">
      <div className="file-upload-header">
        <FileUp className="upload-icon" />
        <h3 className="upload-title">העלאת קובץ</h3>
      </div>

      <div className="file-upload-form">
        <div className="file-input-group">
          <div className="file-input-wrapper">
            {!selectedFile ? (
              <label htmlFor="file-upload" className="file-select-button">
                <FileText className="file-icon" />
                <span>בחר קובץ</span>
              </label>
            ) : (
              <div className="selected-file">
                <FileText className="file-icon" />
                <span className="file-name">{selectedFile.name}</span>
                <button
                  className="file-clear-button"
                  onClick={() => setSelectedFile(null)}
                  type="button"
                  aria-label="נקה בחירה"
                >
                  &times;
                </button>
              </div>
            )}
            <input type="file" id="file-upload" onChange={handleFileChange} className="hidden-file-input" />
          </div>
        </div>

        <div className="file-description-group">
          <label htmlFor="file-description" className="file-label">
            תיאור הקובץ
          </label>
          <input
            type="text"
            id="file-description"
            placeholder="הזן תיאור לקובץ"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="file-description-input"
          />
        </div>

        <button
          type="button"
          onClick={handleUpload}
          className={`upload-button ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              <span>מעלה...</span>
            </>
          ) : (
            <>
              <Upload className="button-icon" />
              <span>העלאה</span>
            </>
          )}
        </button>

        {uploadStatus.message && (
          <div className={`upload-status ${uploadStatus.success ? "success" : "error"}`}>
            {uploadStatus.success ? (
              <CheckCircle className="status-icon success" />
            ) : (
              <AlertCircle className="status-icon error" />
            )}
            <p>{uploadStatus.message}</p>
          </div>
        )}

        {error && (
          <div className="upload-error">
            <AlertCircle className="error-icon" />
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUpload

