import { Box, Grid, Typography } from "@mui/material";
import axiosInstance from "../utils/axios";
import { useEffect } from "react";

export default function Profile() {
    const token = localStorage.getItem("token");

    const getProfileDetails = async() => {
        try {
            const resp = await axiosInstance.get('/profile-details', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
                <Typography sx={{
                    fontSize: 20,
                }}>Account</Typography>

                <Box sx={{

                }}>

                </Box>
            </Grid> 
        </Grid>
    )
}