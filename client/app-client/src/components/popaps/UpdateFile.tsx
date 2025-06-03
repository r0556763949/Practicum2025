
import  React from "react"
import { useState } from "react"
import { Edit, FileText, X, Upload } from "lucide-react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/Store"
import { updateFile } from "../store/FileSlice"

interface UpdateFilePopupProps {
  onClose: () => void
  clientId: number
  projectId: number
  fileId: number
  currentName: string
  currentDescription: string
}

const UpdateFilePopup = ({
  onClose,
  clientId,
  projectId,
  fileId,
  currentName,
  currentDescription,
}: UpdateFilePopupProps) => {
  const [name, setName] = useState(currentName)
  const [description, setDescription] = useState(currentDescription)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [replaceContent, setReplaceContent] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setReplaceContent(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setMessage("יש להזין שם קובץ")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      const resultAction = await dispatch(
        updateFile({
          clientId,
          projectId,
          fileId,
          name: name.trim(),
          description: description.trim(),
          replaceContent
        }),
      )

      if (updateFile.fulfilled.match(resultAction)) {
        setMessage("הקובץ עודכן בהצלחה!")
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        setMessage("שגיאה בעדכון הקובץ")
      }
    } catch (error) {
      setMessage("אירעה שגיאה לא צפויה")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <Edit className="modal-title-icon" />
            עדכון קובץ
          </h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>
              <FileText className="form-icon" />
              שם הקובץ:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
              placeholder="הזן שם קובץ"
            />
          </div>

          <div className="form-group">
            <label>
              <Edit className="form-icon" />
              תיאור:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
              placeholder="הזן תיאור לקובץ"
              rows={3}
              style={{ resize: "vertical", minHeight: "80px" }}
            />
          </div>

          <div className="form-group">
            <label>
              <Upload className="form-icon" />
              החלפת קובץ (אופציונלי):
            </label>
            <div className="file-input-wrapper">
              {!selectedFile ? (
                <label htmlFor="file-update" className="file-select-button">
                  <FileText className="file-icon" />
                  <span>בחר קובץ חדש</span>
                </label>
              ) : (
                <div className="selected-file">
                  <FileText className="file-icon" />
                  <span className="file-name">{selectedFile.name}</span>
                  <button
                    className="file-clear-button"
                    onClick={() => {
                      setSelectedFile(null)
                      setReplaceContent(false)
                    }}
                    type="button"
                    aria-label="נקה בחירה"
                  >
                    &times;
                  </button>
                </div>
              )}
              <input type="file" id="file-update" onChange={handleFileChange} className="hidden-file-input" />
            </div>
            {selectedFile && (
              <p style={{ fontSize: "0.8rem", color: "#6c757d", marginTop: "0.5rem" }}>הקובץ הנוכחי יוחלף בקובץ החדש</p>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="modal-button secondary" onClick={onClose}>
              ביטול
            </button>
            <button type="submit" className={`modal-button primary ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  <span>מעדכן...</span>
                </>
              ) : (
                <span>עדכון</span>
              )}
            </button>
          </div>
        </form>

        {message && <p className={`modal-message ${message.includes("בהצלחה") ? "success" : "error"}`}>{message}</p>}
      </div>
    </div>
  )
}

export default UpdateFilePopup
