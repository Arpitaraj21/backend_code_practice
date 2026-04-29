import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthLayout from "./layout/AuthLayout";

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
    }
])