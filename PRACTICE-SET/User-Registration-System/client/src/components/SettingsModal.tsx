import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axiosInstance, { endpoints } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PositionedSnackbar from '../utils/snackbar';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 150,
    bgcolor: 'background.paper',
    border: '0px',
    p: 4,
};


export default function SettingsModal({ open, handleClose }: any) {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', success: false })

    const handleLogout = async () => {
        try {
            await axiosInstance.post(endpoints.logout);
            handleClose();
            navigate('/login');
        }
        catch (error) {
            console.log("error in logout handler", error);
        }
    }

    const handleEditProfile = () => {
        handleClose();
        navigate("/edit-profile");
    }

    const handleDeleteUser = async () => {
        try {
            const deleteUser = await axiosInstance.delete(endpoints.deleteProfile);
            console.log(deleteUser);
            navigate('/login');
            setSnackbar({ open: true, message: deleteUser.data.message, success: false });
        } catch (error) {
            console.log("error", error)
            setSnackbar({ open: true, message: 'Failed to delete!', success: false })
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
                <Button onClick={handleEditProfile} sx={{
                    color: 'black',
                    fontWeight: '400',
                    fontSize: '16px',
                }}>
                    Profile
                </Button>
                <Button onClick={handleLogout} sx={{
                    color: 'black',
                    fontWeight: '400',
                    fontSize: '16px',
                }}>
                    Logout
                </Button>

                <Button variant="contained" sx={{ mt: 2, gap: 2 }} onClick={handleDeleteUser}>
                    Delete Account
                </Button>


                <PositionedSnackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    success={snackbar.success}
                    onClose={() => setSnackbar({ open: false, message: '', success: false })}
                />
            </Box>
        </Modal>
    );
}