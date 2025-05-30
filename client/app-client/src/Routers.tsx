import { createBrowserRouter } from "react-router"
import AppLayout from "./AppLayout"
import ManagerHome from "./components/managerApp/ManagerHome"
import FilePage from "./components/centeral/pages/FilePage"
import ClientPage from "./components/managerApp/ClientPage"
import ProjectPage from "./components/centeral/pages/ProjectPage"
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
        ]

    }
])