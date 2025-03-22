import { createBrowserRouter } from "react-router"
import App from "./App"
import PogramFile from "./components/PogramFile"
import AppLayout from "./AppLayout"
import AuthForm from "./components/AuthForm"
export const Router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement:<h1>error</h1>,
        children: [
            { path: '/', element: <AuthForm /> },
           { path: '/PogramFile', element: <PogramFile /> },
        ]

    }
])