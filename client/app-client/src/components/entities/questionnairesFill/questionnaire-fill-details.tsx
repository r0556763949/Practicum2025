"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/Store"
import { FileText, X } from "lucide-react"
import { QuestionnaireFill } from "../../store/QuestionnaireFillSlice"
import { formatDate } from "../../centeral/dateUtils"

interface QuestionnaireFillDetailsProps {
  questionnaireFill: QuestionnaireFill
  onClose: () => void
}

const QuestionnaireFillDetails = ({ questionnaireFill, onClose }: QuestionnaireFillDetailsProps) => {
  const { questionnaires } = useSelector((state: RootState) => state.questionnaires)
  const [questionnaireName, setQuestionnaireName] = useState<string>("שאלון")

  useEffect(() => {
    const questionnaire = questionnaires.find((q) => q.id === questionnaireFill.questionnaireId)
    if (questionnaire) {
      setQuestionnaireName(questionnaire.name)
    }
  }, [questionnaires, questionnaireFill])

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <FileText className="modal-title-icon" />
            תוצאות שאלון
          </h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="details-section">
            <h3 className="section-title">פרטי השאלון</h3>

            <div className="detail-item">
              <div className="detail-label">שם השאלון:</div>
              <div className="detail-value">{questionnaireName}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">תאריך שליחה:</div>
              <div className="detail-value">{formatDate(questionnaireFill.getToFillAt)}</div>
            </div>

            {questionnaireFill.filledAt && (
              <div className="detail-item">
                <div className="detail-label">תאריך מילוי:</div>
                <div className="detail-value">{formatDate(questionnaireFill.filledAt)}</div>
              </div>
            )}

            <div className="detail-item">
              <div className="detail-label">סטטוס:</div>
              <div className="detail-value">
                <span className={`status-badge ${questionnaireFill.filledAt ? "completed" : "pending"}`}>
                  {questionnaireFill.filledAt ? "הושלם" : "ממתין למילוי"}
                </span>
              </div>
            </div>
          </div>

          {questionnaireFill.aiSummary && (
            <div className="details-section">
              <h3 className="section-title">סיכום AI</h3>
              <div className="ai-summary">
                <p>{questionnaireFill.aiSummary}</p>
              </div>
            </div>
          )}

          {questionnaireFill.rawSummary && (
            <div className="details-section">
              <h3 className="section-title">תשובות מפורטות</h3>
              <div className="raw-summary">
                <pre>{questionnaireFill.rawSummary}</pre>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-button primary">
            סגור
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireFillDetails
