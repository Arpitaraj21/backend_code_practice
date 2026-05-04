import { Box, Grid, Typography } from "@mui/material";
import axiosInstance from "../utils/axios";
import { useState, useEffect } from "react";
import { icons } from "../utils/Icons";
import PositionedSnackbar from "../utils/snackbar";
import BasicModal from "./SettingsModal";

interface UserData {
    name: string;
    username: string;
    email: string;
    role: string;
}

export default function Profile() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', success: false });

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [userData, setUserData] = useState<UserData | null>(null);
    const getProfileDetails = async () => {
        try {
            const resp = await axiosInstance.get('/profile-details');
            setUserData(resp.data.user);
            console.log(resp);
        } catch (error) {
            console.log("error in fetching ui", error);

        }
    }

    useEffect(() => {
        getProfileDetails();
    }, [])


    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    height: '15vh',
                    background: 'linear-gradient(to bottom, #4687ff 70%, #fff)',
                }}>
                    <Box>
                        <Typography sx={{
                            fontSize: 34,
                            color: 'white',
                            fontWeight: 'bold',
                        }}>Hi, {userData?.name?.split(' ')[0] ?? ''}</Typography>

                        <Typography sx={{ color: 'white', fontSize: '19px' }}>Here is your expense overview</Typography>
                    </Box>
                    <icons.setting
                        sx={{ cursor: 'pointer', color: 'white', fontSize: 30 }}
                        onClick={handleOpenModal}
                    />
                </Box>
                
                <BasicModal open={openModal} handleClose={handleCloseModal} />

                <PositionedSnackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    success={snackbar.success}
                    onClose={() => setSnackbar({ open: false, message: '', success: false })}
                />
            </Grid>
        </Grid >
    )
}