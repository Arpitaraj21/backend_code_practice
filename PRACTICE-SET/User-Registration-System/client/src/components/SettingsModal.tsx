import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axiosInstance, { endpoints } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
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

            </Box>
        </Modal>
    );
}