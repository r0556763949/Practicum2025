"use client"

import { X, Edit, Link, FileSpreadsheet, FileText, ExternalLink } from "lucide-react"

interface QuestionnaireDetailsProps {
  questionnaire: {
    id: number
    name: string
    sheetName: string
    prompt: string
    googleSheetId: string
    googleFormUrl: string
    isActive: boolean
    createdAt: string
  }
  onClose: () => void
  onEdit: () => void
}

const QuestionnaireDetails = ({ questionnaire, onClose, onEdit }: QuestionnaireDetailsProps) => {
  const openGoogleForm = () => {
    window.open(questionnaire.googleFormUrl, "_blank")
  }

  const openGoogleSheet = () => {
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${questionnaire.googleSheetId}`
    window.open(sheetUrl, "_blank")
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">פרטי שאלון</h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="details-section">
            <h3 className="section-title">מידע כללי</h3>

            <div className="detail-item">
              <div className="detail-label">שם השאלון:</div>
              <div className="detail-value">{questionnaire.name}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">שם הגיליון:</div>
              <div className="detail-value">{questionnaire.sheetName}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">תאריך יצירה:</div>
              <div className="detail-value">{formatDate(questionnaire.createdAt)}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">סטטוס:</div>
              <div className="detail-value">
                <span className={`status-badge ${questionnaire.isActive ? "active" : "inactive"}`}>
                  {questionnaire.isActive ? "פעיל" : "לא פעיל"}
                </span>
              </div>
            </div>
          </div>

          {questionnaire.prompt && (
            <div className="details-section">
              <h3 className="section-title">GPT טקסט </h3>
              <div className="prompt-content">
                <FileText className="prompt-icon" />
                <p className="prompt-text">{questionnaire.prompt}</p>
              </div>
            </div>
          )}

          <div className="details-section">
            <h3 className="section-title">קישורים</h3>

            <div className="links-container">
              <button className="link-button form" onClick={openGoogleForm}>
                <Link className="link-icon" />
                <span>פתח טופס Google</span>
                <ExternalLink className="external-icon" />
              </button>

              <button className="link-button sheet" onClick={openGoogleSheet}>
                <FileSpreadsheet className="link-icon" />
                <span>פתח גיליון Google</span>
                <ExternalLink className="external-icon" />
              </button>
            </div>

            {/* <div className="detail-item">
              <div className="detail-label">כתובת הטופס:</div>
              <div className="detail-value url-value">
                <a href={questionnaire.googleFormUrl} target="_blank" rel="noopener noreferrer">
                  {questionnaire.googleFormUrl}
                </a>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">מזהה הגיליון:</div>
              <div className="detail-value">{questionnaire.googleSheetId}</div>
            </div> */}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-button secondary">
            סגור
          </button>
          <button onClick={onEdit} className="modal-button primary">
            <Edit className="button-icon" />
            <span>ערוך שאלון</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireDetails
