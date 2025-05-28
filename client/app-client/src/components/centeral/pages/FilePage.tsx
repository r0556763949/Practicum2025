
import { useParams } from "react-router-dom"
import FileActionsPanel from "../../entities/file/FileActionsPanelProps"
import RemarksComponent from "../../entities/file/ReMarks"
import FilePreview from "../../entities/project/FilePreview"
import { FileText, MessageSquare } from "lucide-react"

const FilePage = () => {
  const { projectId, fileId, clientId } = useParams<{
    projectId: string
    fileId: string
    clientId: string
  }>()

  return (
    <div className="file-page">
      <div className="file-content">
        <div className="file-remarks-header">
          <MessageSquare className="section-icon" />
          <h2 className="section-title">הערות</h2>
        </div>
        <RemarksComponent fileId={Number(fileId)} clientId={Number(clientId)} />
      </div>

      <div className="file-sidebar">
        <div className="sidebar-section">
          <div className="sidebar-header">
            <FileText className="sidebar-icon" />
            <h3 className="sidebar-title">פעולות קובץ</h3>
          </div>
          <FileActionsPanel clientId={Number(clientId)} projectId={Number(projectId)} fileId={Number(fileId)} />
        </div>

        <div className="sidebar-section">
          <div className="sidebar-header">
            <FileText className="sidebar-icon" />
            <h3 className="sidebar-title">תצוגה מקדימה</h3>
          </div>
          <FilePreview
            clientId={Number.parseInt(clientId!)}
            projectId={Number.parseInt(projectId!)}
            fileId={Number(fileId)}
          />
        </div>
      </div>
    </div>
  )
}

export default FilePage


