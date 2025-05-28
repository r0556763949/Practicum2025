
import { useEffect } from "react"
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
  const { loading, error } = useSelector((state: RootState) => state.files)
  const fileUrl = useSelector((state: RootState) => state.files.selectedFileUrl)

  useEffect(() => {
    if (fileId) {
      dispatch(fetchFileUrl({ clientId, projectId, id: fileId }))
    }

  }, [dispatch, clientId, projectId, fileId])

  return (
    <div className="file-preview-container">
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

