import { createBrowserRouter } from "react-router"
import App from "./App"
import PogramFile from "./components/PogramFile"
import AppLayout from "./AppLayout"
import AuthForm from "./components/AuthForm"
import ClientList from "./components/ClientList"
import ClientProjects from "./components/ClientProjects"
import ProjectDetails from "./components/ProjectDetails"
import Home from "./Home"
import ManagerHome from "./components/ManagerHome"
import ClientHome from "./components/ClientHome"
export const Router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement:<h1>error</h1>,
        children: [
          {path:'/',element:<Home/>},
          {path:'/Manager',element:<ManagerHome/>},
          {path:'/Client',element:<ClientHome/>},
            { path: '/clientList', element: <ClientList /> },
            { path: "/projects/:id", element: <ClientProjects /> },
        //    { path: '/PogramFile', element: <PogramFile /> },
         {path:"/clients/:clientId/projects/:projectId",element:<ProjectDetails />}
        ]

    }
])