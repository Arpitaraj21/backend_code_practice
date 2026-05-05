import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 12}}>
                <Outlet/>
            </Grid>
        </Grid>
    )
}