"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import  { AppDispatch, RootState } from "../../store/Store"
import { AlertCircle, CheckCircle, Eye, FileText, Loader, Plus, Search, Trash2 } from "lucide-react"
import ManagerQuestionnaireFillForm from "../../popaps/manager-questionnaire-fill-form"
import QuestionnaireFillDetails from "../../popaps/questionnaire-fill-details"
import { QuestionnaireFill, deleteQuestionnaireFill, fetchQuestionnaireFills } from "../../store/QuestionnaireFillSlice"
import { fetchQuestionnaires } from "../../store/QuestionnaireSlice"
import { formatDate } from "../../centeral/dateUtils"

interface ManagerQuestionnaireFillListProps {
  clientId: number
  projectId?: number
}

const ManagerQuestionnaireFillList = ({ clientId, projectId }: ManagerQuestionnaireFillListProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { questionnaireFills, loading, error } = useSelector((state: RootState) => state.questionnairesFill)
  const { questionnaires } = useSelector((state: RootState) => state.questionnaires)

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedFill, setSelectedFill] = useState<QuestionnaireFill | null>(null)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    dispatch(fetchQuestionnaireFills())
    dispatch(fetchQuestionnaires())
  }, [dispatch])

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [statusMessage])

  // Filter questionnaire fills for the current client
  const clientQuestionnaireFills = questionnaireFills.filter(
    (fill:any) => fill.clientId === clientId && (projectId ? fill.projectId === projectId : true),
  )

  // Get questionnaire name for each fill
  const enrichedQuestionnaireFills = clientQuestionnaireFills.map((fill:any) => {
    const questionnaire = questionnaires.find((q) => q.id === fill.questionnaireId)
    return {
      ...fill,
      questionnaireName: questionnaire?.name || "שאלון",
    }
  })

  // Filter by search term
  const filteredQuestionnaireFills = enrichedQuestionnaireFills.filter((fill) =>
    fill.questionnaireName?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddQuestionnaire = () => {
    setIsAddFormOpen(true)
  }

  const handleViewDetails = (fill: QuestionnaireFill) => {
    setSelectedFill(fill)
    setIsDetailsOpen(true)
  }

  const handleDeleteQuestionnaireFill = async (id: number) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק שאלון זה?")) {
      try {
        await dispatch(deleteQuestionnaireFill(id)).unwrap()
        setStatusMessage({ type: "success", text: "השאלון נמחק בהצלחה" })
      } catch (error: any) {
        setStatusMessage({ type: "error", text: error.message || "שגיאה במחיקת השאלון" })
      }
    }
  }

  const handleFormClose = () => {
    setIsAddFormOpen(false)
    // Refresh the list
    dispatch(fetchQuestionnaireFills())
  }

  const handleDetailsClose = () => {
    setIsDetailsOpen(false)
    setSelectedFill(null)
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

  return (
    <div className="questionnaire-fills-manager-container">
      <div className="questionnaire-fills-header">
        <h2 className="section-title">שאלונים</h2>

        <div className="questionnaire-fills-actions">
          <button className="add-button" onClick={handleAddQuestionnaire}>
            <Plus className="button-icon" />
            <span>שלח שאלון</span>
          </button>

          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="חיפוש שאלונים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

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

      {filteredQuestionnaireFills.length === 0 ? (
        <div className="empty-container">
          <FileText className="empty-icon" />
          <p>אין שאלונים לתצוגה</p>
        </div>
      ) : (
        <div className="questionnaire-fills-table-container">
          <table className="questionnaire-fills-table">
            <thead>
              <tr>
                <th>שם השאלון</th>
                <th>תאריך שליחה</th>
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestionnaireFills.map((fill:any) => (
                <tr key={fill.id}>
                  <td>{fill.questionnaireName}</td>
                  <td>{formatDate(fill.getToFillAt)}</td>
                  <td>
                    <span className={`status-badge ${fill.filledAt ? "completed" : "pending"}`}>
                      {fill.filledAt ? "הושלם" : "ממתין למילוי"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-button edit"
                        onClick={() => handleViewDetails(fill)}
                        aria-label="צפה בפרטי שאלון"
                        disabled={!fill.filledAt}
                      >
                        <Eye className="action-icon" />
                      </button>
                      <button
                        className="action-button edit"
                        onClick={() => handleDeleteQuestionnaireFill(fill.id)}
                        aria-label="מחק שאלון"
                      >
                        <Trash2 className="action-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isAddFormOpen && (
        <ManagerQuestionnaireFillForm clientId={clientId} projectId={projectId} onClose={handleFormClose} />
      )}

      {isDetailsOpen && selectedFill && (
        <QuestionnaireFillDetails questionnaireFill={selectedFill} onClose={handleDetailsClose} />
      )}
    </div>
  )
}

export default ManagerQuestionnaireFillList
