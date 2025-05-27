import { createBrowserRouter } from "react-router"
import AppLayout from "./AppLayout"
import ClientList from "./components/managerApp/ClientList"
import Home from "./components/centeral/pages/Home"
import ManagerHome from "./components/pages/ManagerHome"
import FilePage from "./components/pages/FilePage"
import ClientPage from "./components/pages/ClientPage"
import ProjectPage from "./components/pages/ProjectPage"
import ClientDashboard from "./components/clientApp/client-dashboard"
import SystemHome from "./components/centeral/pages/Home"
export const Router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>error</h1>,
        children: [
            { path: '/', element: <SystemHome /> },
            { path: '/Manager', element: <ManagerHome /> },
            { path: 'ClientPage/:clientId', element: <ClientPage /> },
            { path: 'ClientPage/:clientId/ProjectPage/:projectId', element: <ProjectPage /> },
            { path: 'ClientPage/:clientId/ProjectPage/:projectId/FilePage/:fileId', element: <FilePage /> },


            
            { path: '/Client', element: <ClientDashboard /> },
            { path: '/clientList', element: <ClientList /> },
        ]

    }
])