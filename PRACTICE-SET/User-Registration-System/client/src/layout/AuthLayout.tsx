import { Box } from "@mui/material";
import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function AuthLayout() {
    const [isLogin, setIsLogin] = useState(false);

    const handleAuthToggle = () => {
        setIsLogin((prev) => !prev);
    }
    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            backgroundColor: 'blue',
            position: 'relative'
        }}>

            <Box sx={{
                display: 'flex',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <img src="/LOGO.png" />
            </Box>

            <Box>
                {!isLogin ? <Login/> : <Signup/>}
            </Box>
        </Box>
    )
}
