
"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/Store"
import { fetchRemarksByFileId, addRemark, updateRemark, deleteRemark, fetchFileOwner } from "../../store/ReMarkSlice"
import decodeToken from "../../centeral/authUtils"
import {
  MessageSquare,
  Send,
  MoreVertical,
  Edit,
  Trash2,
  Save,
  X,
  Loader,
  AlertTriangle,
  User,
  UserCog,
  CheckCircle,
} from "lucide-react"

interface RemarksComponentProps {
  fileId: number
  clientId: number
}

const RemarksComponent = ({ fileId, clientId }: RemarksComponentProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { remarks, loading, error } = useSelector((state: RootState) => state.remarks)
  const [newRemark, setNewRemark] = useState("")
  const [selectedRemark, setSelectedRemark] = useState<number | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
  const [fileOwnerId, setFileOwnerId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const remarksEndRef = useRef<HTMLDivElement | null>(null)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    dispatch(fetchRemarksByFileId({ fileId }))
    dispatch(fetchFileOwner(fileId))
      .unwrap()
      .then((ownerId) => setFileOwnerId(ownerId))
      .catch((error) => console.error("Failed to fetch file owner:", error))
  }, [dispatch, fileId])

  useEffect(() => {
    if (remarksEndRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [remarks])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [newRemark])

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [statusMessage])

  const handleAddRemark = async () => {
    if (!newRemark.trim() || isSubmitting) return

    setIsSubmitting(true)
    const token = sessionStorage.getItem("token")
    const decodedToken = decodeToken(token!)
    if (decodedToken) {
      const userId = Number.parseInt(decodedToken.sub)
      try {
        await dispatch(addRemark({ fileId, content: newRemark, clientId: userId }))
        setNewRemark("")
        setStatusMessage({ type: "success", text: "ההערה נוספה בהצלחה" })

        // Refresh remarks after adding
        dispatch(fetchRemarksByFileId({ fileId }))
      } catch (error) {
        console.error("Failed to add remark:", error)
        setStatusMessage({ type: "error", text: "שגיאה בהוספת ההערה" })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleDeleteRemark = async (remarkId: number) => {
    try {
      await dispatch(deleteRemark({ id: remarkId }))
      setDropdownOpen(null)
      setStatusMessage({ type: "success", text: "ההערה נמחקה בהצלחה" })

      // Refresh remarks after deleting
      dispatch(fetchRemarksByFileId({ fileId }))
    } catch (error) {
      console.error("Failed to delete remark:", error)
      setStatusMessage({ type: "error", text: "שגיאה במחיקת ההערה" })
    }
  }

  const handleUpdateRemark = (remarkId: number) => {
    setSelectedRemark(remarkId)
    const remarkToEdit = remarks.find((remark) => remark.id === remarkId)
    setNewRemark(remarkToEdit?.content || "")
    setDropdownOpen(null)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const handleSaveUpdate = async () => {
    if (!newRemark.trim() || selectedRemark === null || isSubmitting) return

    setIsSubmitting(true)
    try {
      await dispatch(updateRemark({ id: selectedRemark, content: newRemark }))
      setNewRemark("")
      setSelectedRemark(null)
      setStatusMessage({ type: "success", text: "ההערה עודכנה בהצלחה" })

      // Refresh the remarks list
      dispatch(fetchRemarksByFileId({ fileId }))
    } catch (error) {
      console.error("Failed to update remark:", error)
      setStatusMessage({ type: "error", text: "שגיאה בעדכון ההערה" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelUpdate = () => {
    setNewRemark("")
    setSelectedRemark(null)
  }

  const handleDropdownToggle = (remarkId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setDropdownOpen(dropdownOpen === remarkId ? null : remarkId)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (selectedRemark === null) {
        handleAddRemark()
      } else {
        handleSaveUpdate()
      }
    }
  }

  const getCurrentUserId = (): number | null => {
    const token = sessionStorage.getItem("token")
    if (!token) return null
    const decodedToken = decodeToken(token)
    return decodedToken ? Number.parseInt(decodedToken.sub) : null
  }

  const currentUserId = getCurrentUserId()

  // Sort remarks to show newest at the bottom
  const sortedRemarks = [...remarks].sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime())

  return (
    <div className="chat-container">
      <div className="chat-header">
        <MessageSquare className="chat-icon" />
        <h3 className="chat-title">שיחה</h3>
      </div>

      {statusMessage && (
        <div className={`chat-status ${statusMessage.type}`}>
          {statusMessage.type === "success" ? (
            <CheckCircle className="status-icon" />
          ) : (
            <AlertTriangle className="status-icon" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {loading && (
        <div className="chat-loading">
          <Loader className="loading-icon" />
          <p>טוען הודעות...</p>
        </div>
      )}

      {error && (
        <div className="chat-error">
          <AlertTriangle className="error-icon" />
          <p>{error}</p>
        </div>
      )}

      <div className="chat-messages" ref={chatContainerRef} onClick={() => setDropdownOpen(null)}>
        {sortedRemarks.length === 0 ? (
          <div className="chat-empty">
            <MessageSquare className="empty-icon" />
            <p>אין הודעות עדיין. התחל את השיחה!</p>
          </div>
        ) : (
          sortedRemarks.map((remark) => {
            const isOwner = remark.clientId === fileOwnerId
            const isCurrentUser = remark.clientId === currentUserId
            const canEdit = isCurrentUser

            return (
              <div
                key={remark.id}
                className={`chat-message ${isOwner ? "architect" : "client"} ${isCurrentUser ? "current-user" : ""}`}
              >
                <div className="message-avatar">
                  {isOwner ? <UserCog className="avatar-icon" /> : <User className="avatar-icon" />}
                </div>

                <div className="message-content">
                  <div className="message-bubble">
                    <p>{remark.content}</p>
                  </div>
                  <div className="message-meta">
                    <span className="message-time">{new Date(remark.createAt).toLocaleString()}</span>
                  </div>
                </div>

                {canEdit && (
                  <div className="message-actions">
                    <button
                      className="message-actions-toggle"
                      onClick={(e) => handleDropdownToggle(remark.id, e)}
                      aria-label="אפשרויות הודעה"
                    >
                      <MoreVertical className="actions-icon" />
                    </button>

                    {dropdownOpen === remark.id && (
                      <div className="message-dropdown">
                        <button className="dropdown-item edit" onClick={() => handleUpdateRemark(remark.id)}>
                          <Edit className="item-icon" />
                          <span>ערוך</span>
                        </button>
                        <button className="dropdown-item delete" onClick={() => handleDeleteRemark(remark.id)}>
                          <Trash2 className="item-icon" />
                          <span>מחק</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
        <div ref={remarksEndRef}></div>
      </div>

      <div className="chat-input-container">
        <div className="chat-input">
          <textarea
            ref={textareaRef}
            value={newRemark}
            onChange={(e) => setNewRemark(e.target.value)}
            onKeyDown={handleKeyDown}
            className="chat-textarea"
            placeholder={selectedRemark === null ? "כתוב הודעה..." : "ערוך הודעה..."}
            rows={1}
          />

          <div className="chat-actions">
            {selectedRemark !== null ? (
              <>
                <button
                  className={`chat-button save ${isSubmitting ? "loading" : ""}`}
                  onClick={handleSaveUpdate}
                  disabled={!newRemark.trim() || isSubmitting}
                >
                  {isSubmitting ? <span className="loading-spinner"></span> : <Save className="button-icon" />}
                </button>
                <button className="chat-button cancel" onClick={handleCancelUpdate}>
                  <X className="button-icon" />
                </button>
              </>
            ) : (
              <button
                className={`chat-button send ${isSubmitting ? "loading" : ""}`}
                onClick={handleAddRemark}
                disabled={!newRemark.trim() || isSubmitting}
              >
                {isSubmitting ? <span className="loading-spinner"></span> : <Send className="button-icon" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemarksComponent




