import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axiosInstance, { endpoints } from '../utils/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 150,
    bgcolor: 'background.paper',
    border: '0px',
    // boxShadow: 24,
    p: 4,
};

interface UserData {
    name: string;
    username: string;
    email: string;
    role: string;
}

export default function BasicModal({ open, handleClose }: any) {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', success: false });
    const [userData, setUserData] = useState<UserData | null>(null);

    const handleLogout = async () => {
        try {
            const resp = await axiosInstance.post(endpoints.logout);
            setUserData(null);
            setSnackbar({ open: true, message: "Logged out successfully", success: true });
            navigate('/login');
            console.log(resp);
        }
        catch (error) {
            console.log("error in logout handler", error);
            setSnackbar({ open: true, message: 'Error occurred while logging out', success: false });
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Button>
                    Profile
                </Button>
                <Button onClick={handleLogout} sx={{
                    color: 'black',
                    fontWeight: '400',
                    fontSize: '16px',
                }}>
                    Logout
                </Button>

            </Box>
        </Modal>
    );
}