
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

