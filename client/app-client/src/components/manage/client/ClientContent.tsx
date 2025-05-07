
// const ClientContent = () => {
//     return (
//         <div >
//             <h2 >Content goes here...</h2>
//         </div>
//     );
// };


// export default ClientContent;
"use client"

import { Building2, Calendar, FileText, Info, MapPin, User } from "lucide-react"
import QuestionnaireComponent from "../googlForm"

const ClientContent = () => {
  return (
    <div className="client-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">לוח בקרה</h2>
      </div>
      <QuestionnaireComponent></QuestionnaireComponent>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <Info className="section-icon" />
            <h3 className="section-title">מידע כללי</h3>
          </div>
          <p className="section-description">
            ברוכים הבאים למערכת הניהול של אסתי מונק אדריכלות. כאן תוכלו לנהל את הפרויקטים שלכם, לצפות בקבצים ולתקשר עם
            צוות האדריכלים.
          </p>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="card-icon">
              <User />
            </div>
            <div className="card-content">
              <h4 className="card-title">פרופיל</h4>
              <p className="card-description">צפייה ועדכון פרטי הפרופיל שלך</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">
              <Building2 />
            </div>
            <div className="card-content">
              <h4 className="card-title">פרויקטים</h4>
              <p className="card-description">ניהול הפרויקטים שלך</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">
              <FileText />
            </div>
            <div className="card-content">
              <h4 className="card-title">קבצים</h4>
              <p className="card-description">צפייה בקבצים ותוכניות</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">
              <Calendar />
            </div>
            <div className="card-content">
              <h4 className="card-title">לוח זמנים</h4>
              <p className="card-description">מעקב אחר התקדמות הפרויקט</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">
              <MapPin />
            </div>
            <div className="card-content">
              <h4 className="card-title">מיקומים</h4>
              <p className="card-description">מידע על מיקומי הפרויקטים</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientContent
