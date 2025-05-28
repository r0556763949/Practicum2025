
import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUploadUrl, confirmUpload } from "../../store/FileSlice"
import type { AppDispatch, RootState } from "../../store/Store"
import {  FileText, Upload, AlertCircle, CheckCircle } from "lucide-react"

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

  useEffect(() => {
    if (uploadStatus.message) {
      const timeout = setTimeout(() => {
        setUploadStatus({ success: null, message: "" })
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [uploadStatus])

  return (
    <div className="file-upload">
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

