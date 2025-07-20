
import ClientList from "./ClientList"
import { Calendar, Users } from "lucide-react"
import QuestionnaireManagement from "../entities/questionnaires/QuestionnairePage"
import { useNavigate } from "react-router-dom"

const ManagerHome = () => {
  const navigate = useNavigate()
  
  return (
    <div className="manager-home">
      <div className="manager-header">
        <Users className="manager-icon" />
        <h1 className="manager-title">ניהול </h1>
      </div>
      <button className="primary-button calendar-nav-button" onClick={() => navigate("/Manager/Calendar")}>
          <Calendar className="calendar-button-icon" />
          יומן זמינות
        </button>
      <ClientList />
      <QuestionnaireManagement></QuestionnaireManagement>
    </div>
  )
}

export default ManagerHome


