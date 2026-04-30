import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from './layout/MainLayout'
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
export const router = createBrowserRouter([
    {
        // default redirect: when user tries to access / send them to /login
        path: '/',
        element: <Navigate to="/login" replace />
    },

    {
        element: <AuthLayout />,
        children: [
            {path: "login", element: <Login/>},
            { path: "signup", element: <Signup />}
        ]
    },

    {
        element: (
            <ProtectedRoutes>
                <MainLayout/>
            </ProtectedRoutes>
        ),
        children: [
            { path: "dashboard", element: <Dashboard /> },
        ]
    }
])