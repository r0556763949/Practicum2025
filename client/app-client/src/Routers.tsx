import { createBrowserRouter } from "react-router"
import AppLayout from "./AppLayout"
import ClientList from "./components/manager/ClientList"
import ProjectDetails from "./components/old/ProjectDetails"
import Home from "./components/pages/Home"
import ManagerHome from "./components/pages/ManagerHome"
import ClientHome from "./components/pages/ClientHome"
import ClientDetails from "./components/manager/ClientDetails"
import FilePage from "./components/pages/FilePage"
import ClientPage from "./components/pages/ClientPage"
import ProjectPage from "./components/pages/ProjectPage"
export const Router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement:<h1>error</h1>,
        children: [
          {path:'/',element:<Home/>},
          {path:'/Manager',element:<ManagerHome/>},
          {path:'/Client',element:<ClientHome/>},
          {path:'ClientPage/:clientId',element:<ClientPage/>},
          {path:'ClientPage/:clientId/ProjectPage/:projectId',element:<ProjectPage/>},
          {path:'ClientPage/:clientId/ProjectPage/:projectId/FilePage/:fileId',element:<FilePage/>},
            { path: '/clientList', element: <ClientList /> },
            { path: '/clientDetails/:clientId', element: <ClientDetails /> },
            // { path: "/projects/:id", element: <ClientProjects /> },
        //    { path: '/PogramFile', element: <PogramFile /> },
         {path:"/clients/:clientId/projects/:projectId",element:<ProjectDetails />}
        ]

    }
])