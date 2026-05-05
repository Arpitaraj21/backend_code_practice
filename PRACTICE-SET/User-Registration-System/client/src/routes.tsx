import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from './layout/MainLayout'
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "./components/Profile";
import EditUserProfile from "./components/EditProfile";
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
            { path: "account", element: <Profile/>},
            { path: "edit-profile", element: <EditUserProfile/>}
        ]
    }
])