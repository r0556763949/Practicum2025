"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/Store"
import { AlertCircle, CheckCircle, FileText, HelpCircle, X } from "lucide-react"
import { fetchQuestionnaires } from "../../store/QuestionnaireSlice"
import { createQuestionnaireFill } from "../../store/QuestionnaireFillSlice"

interface ManagerQuestionnaireFillFormProps {
  clientId: number
  projectId?: number
  onClose: () => void
}

const ManagerQuestionnaireFillForm = ({ clientId, projectId, onClose }: ManagerQuestionnaireFillFormProps) => {
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState<number | null>(null)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { questionnaires, loading: loadingQuestionnaires } = useSelector((state: RootState) => state.questionnaires)

  // Filter only active questionnaires
  const activeQuestionnaires = questionnaires.filter((q) => q.isActive)

  useEffect(() => {
    dispatch(fetchQuestionnaires())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedQuestionnaireId) {
      setStatusMessage({ type: "error", text: "יש לבחור שאלון" })
      return
    }

    setIsSubmitting(true)

    try {
      const data = {
        questionnaireId: selectedQuestionnaireId,
        clientId,
        projectId,
      }

      await dispatch(createQuestionnaireFill(data)).unwrap()
      setStatusMessage({ type: "success", text: "השאלון נשלח בהצלחה" })

      // Close the form after a short delay
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error: any) {
      setStatusMessage({ type: "error", text: error.message || "שגיאה בשליחת השאלון" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <FileText className="modal-title-icon" />
            שליחת שאלון ללקוח
          </h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {statusMessage && (
            <div className={`form-status ${statusMessage.type}`}>
              {statusMessage.type === "success" ? (
                <CheckCircle className="status-icon" />
              ) : (
                <AlertCircle className="status-icon" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="questionnaireId">
                בחר שאלון
                <HelpCircle className="help-icon" title="בחר את השאלון שברצונך לשלוח ללקוח" />
              </label>

              {loadingQuestionnaires ? (
                <div className="select-loading">טוען שאלונים...</div>
              ) : activeQuestionnaires.length === 0 ? (
                <div className="select-empty">אין שאלונים פעילים</div>
              ) : (
                <select
                  id="questionnaireId"
                  className="form-input"
                  value={selectedQuestionnaireId || ""}
                  onChange={(e) => setSelectedQuestionnaireId(Number(e.target.value))}
                >
                  <option value="">-- בחר שאלון --</option>
                  {activeQuestionnaires.map((questionnaire) => (
                    <option key={questionnaire.id} value={questionnaire.id}>
                      {questionnaire.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="form-info">
              <p>
                <strong>שים לב:</strong> לאחר שליחת השאלון, הלקוח יקבל הודעה באזור האישי שלו עם קישור למילוי השאלון.
              </p>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-button secondary" disabled={isSubmitting}>
            ביטול
          </button>
          <button
            onClick={handleSubmit}
            className={`modal-button primary ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting || !selectedQuestionnaireId}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                <span>שולח...</span>
              </>
            ) : (
              <span>שלח שאלון</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManagerQuestionnaireFillForm
