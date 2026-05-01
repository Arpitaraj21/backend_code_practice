import { Grid, Typography } from "@mui/material";
import Dashboard from "../components/Dashboard";

export default function MainLayout() {
    

    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 12}}>
                {/* Header */}
                <Typography>
                    Hello User
                </Typography>

                <Dashboard/>
            </Grid>
        </Grid>
    )
}