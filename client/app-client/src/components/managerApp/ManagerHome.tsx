
import ClientList from "./ClientList"
import { Users } from "lucide-react"
import QuestionnaireManagement from "../entities/questionnaires/QuestionnairePage"

const ManagerHome = () => {
  return (
    <div className="manager-home">
      <div className="manager-header">
        <Users className="manager-icon" />
        <h1 className="manager-title">ניהול </h1>
      </div>
      <ClientList />
      <QuestionnaireManagement></QuestionnaireManagement>
    </div>
  )
}

export default ManagerHome


