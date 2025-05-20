import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { formatDate } from "../../centeral/dateUtils"
import { AlertCircle, CheckCircle, ExternalLink, FileText, Loader } from "lucide-react"
import decodeToken from "../../centeral/authUtils"
import { AppDispatch, RootState } from "../../store/Store"
import { QuestionnaireFill, fetchQuestionnaireFills, updateQuestionnaireFillSummary } from "../../store/QuestionnaireFillSlice"
import { fetchQuestionnaires } from "../../store/QuestionnaireSlice"

const ClientQuestionnaireList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { questionnaireFills, loading, error } = useSelector((state: RootState) => state.questionnairesFill)
  const { questionnaires } = useSelector((state: RootState) => state.questionnaires)
  const [clientId, setClientId] = useState<number | null>(null)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    // Get client ID from token
    const token = sessionStorage.getItem("token")
    if (token) {
      const decoded = decodeToken(token)
      if (decoded && decoded.sub) {
        setClientId(Number(decoded.sub))
      }
    }

    dispatch(fetchQuestionnaireFills())
    dispatch(fetchQuestionnaires())
  }, [dispatch])

  // Filter questionnaire fills for the current client
  const clientQuestionnaireFills = questionnaireFills.filter((fill) => fill.clientId === clientId)

  // Get questionnaire name for each fill
  const enrichedQuestionnaireFills = clientQuestionnaireFills.map((fill) => {
    const questionnaire = questionnaires.find((q) => q.id === fill.questionnaireId)
    return {
      ...fill,
      questionnaireName: questionnaire?.name || "שאלון",
    }
  })

  const handleOpenForm = (fill: QuestionnaireFill) => {
    const questionnaire = questionnaires.find((q) => q.id === fill.questionnaireId)
    if (questionnaire) {
      window.open(questionnaire.googleFormUrl, "_blank")
    }
  }

  const handleConfirmFilled = async (fill: QuestionnaireFill) => {
    if (!clientId) return

    try {
      await dispatch(updateQuestionnaireFillSummary({ id: fill.id, clientId })).unwrap()
      setStatusMessage({ type: "success", text: "השאלון עודכן בהצלחה" })

      // Refresh the list
      dispatch(fetchQuestionnaireFills())
    } catch (error: any) {
      setStatusMessage({ type: "error", text: error.message || "שגיאה בעדכון השאלון" })
    }

    // Clear status message after 3 seconds
    setTimeout(() => {
      setStatusMessage(null)
    }, 3000)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="loading-icon" />
        <p>טוען שאלונים...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertCircle className="error-icon" />
        <p>{error}</p>
      </div>
    )
  }

  if (enrichedQuestionnaireFills.length === 0) {
    return (
      <div className="empty-container">
        <FileText className="empty-icon" />
        <p>אין שאלונים למילוי כרגע</p>
      </div>
    )
  }

  return (
    <div className="questionnaire-fills-container">
      <h2 className="section-title">שאלונים למילוי</h2>

      {statusMessage && (
        <div className={`status-message ${statusMessage.type}`}>
          {statusMessage.type === "success" ? (
            <CheckCircle className="status-icon" />
          ) : (
            <AlertCircle className="status-icon" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <div className="questionnaire-fills-list">
        {enrichedQuestionnaireFills.map((fill:any) => (
          <div key={fill.id} className="questionnaire-fill-card">
            <div className="questionnaire-fill-header">
              <FileText className="questionnaire-fill-icon" />
              <h3 className="questionnaire-fill-title">{fill.questionnaireName}</h3>
            </div>

            <div className="questionnaire-fill-info">
              <div className="info-item">
                <span className="info-label">תאריך בקשה:</span>
                <span className="info-value">{formatDate(fill.getToFillAt)}</span>
              </div>

              <div className="info-item">
                <span className="info-label">סטטוס:</span>
                <span className={`status-badge ${fill.filledAt ? "completed" : "pending"}`}>
                  {fill.filledAt ? "הושלם" : "ממתין למילוי"}
                </span>
              </div>
            </div>

            <div className="questionnaire-fill-actions">
              <button className="action-button primary" onClick={() => handleOpenForm(fill)}>
                <span>מלא שאלון</span>
                <ExternalLink className="button-icon" size={16} />
              </button>

              {!fill.filledAt && (
                <button className="action-button secondary" onClick={() => handleConfirmFilled(fill)}>
                  <span>אישור מילוי</span>
                  <CheckCircle className="button-icon" size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClientQuestionnaireList