
// import ClientList from "../home/ClientList";

// const ManagerHome = () => {
//   return (
//     <><ClientList/></>
//   );
// };

// export default ManagerHome;

import ClientList from "../home/ClientList"
import { Users } from "lucide-react"

const ManagerHome = () => {
  return (
    <div className="manager-home">
      <div className="manager-header">
        <Users className="manager-icon" />
        <h1 className="manager-title">ניהול לקוחות</h1>
      </div>
      <ClientList />
    </div>
  )
}

export default ManagerHome


