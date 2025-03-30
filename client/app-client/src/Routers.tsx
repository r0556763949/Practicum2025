import { createBrowserRouter } from "react-router"
import AppLayout from "./AppLayout"
import ClientList from "./components/manage/home/ClientList"
import Home from "./components/centeral/pages/Home"
import ManagerHome from "./components/manage/pages/ManagerHome"
import ClientHome from "./components/clientApp/ClientHome"
import FilePage from "./components/manage/pages/FilePage"
import ClientPage from "./components/manage/pages/ClientPage"
import ProjectPage from "./components/manage/pages/ProjectPage"
export const Router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>error</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/Manager', element: <ManagerHome /> },
            { path: 'ClientPage/:clientId', element: <ClientPage /> },
            { path: 'ClientPage/:clientId/ProjectPage/:projectId', element: <ProjectPage /> },
            { path: 'ClientPage/:clientId/ProjectPage/:projectId/FilePage/:fileId', element: <FilePage /> },


            
            { path: '/Client', element: <ClientHome /> },
            { path: '/clientList', element: <ClientList /> },
        ]

    }
])