import { createBrowserRouter } from "react-router"
import App from "./App"
import PogramFile from "./components/PogramFile"
import AppLayout from "./AppLayout"
import AuthForm from "./components/popaps/AuthForm"
import ClientList from "./components/manager/ClientList"
import ClientProjects from "./components/ClientProjects"
import ProjectDetails from "./components/old/ProjectDetails"
import Home from "./components/pages/Home"
import ManagerHome from "./components/pages/ManagerHome"
import ClientHome from "./components/pages/ClientHome"
import ClientDetails from "./components/manager/ClientDetails"
import FilePage from "./components/pages/FilePage"
export const Router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement:<h1>error</h1>,
        children: [
          {path:'/',element:<Home/>},
          {path:'/Manager',element:<ManagerHome/>},
          {path:'/Client',element:<ClientHome/>},
          {path:'Project/:projectId/File/:fileId/Client/:clientId',element:<FilePage/>},
            { path: '/clientList', element: <ClientList /> },
            { path: '/clientDetails/:clientId', element: <ClientDetails /> },
            { path: "/projects/:id", element: <ClientProjects /> },
        //    { path: '/PogramFile', element: <PogramFile /> },
         {path:"/clients/:clientId/projects/:projectId",element:<ProjectDetails />}
        ]

    }
])