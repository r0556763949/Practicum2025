
import ClientList from "../managerApp/ClientList"
import { Users } from "lucide-react"
import QuestionnaireManagement from "./QuestionnairePage"

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


