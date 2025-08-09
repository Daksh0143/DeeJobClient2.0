import React from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Grid, IconButton, Typography } from '@mui/material';

const CompanyCard = () => {
    return (
        <Grid
            container
            direction="column"
            sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 3,
                p: 2,
                width: 280,
                backgroundColor: "#fff",
            }}
        >
            <Grid container justifyContent="space-between" alignItems="flex-start">
                <Avatar
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/The_North_Face_logo.svg/768px-The_North_Face_logo.svg.png"
                    variant="square"
                    sx={{ width: 40, height: 40, borderRadius: 2 }}
                />
                <IconButton size="small">
                    <MoreVertIcon />
                </IconButton>
            </Grid>
            <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                Software Engineer
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Posted date: 09 Aug 2025
            </Typography>
            <Grid container alignItems="center" sx={{ mt: 1 }}>
                <PeopleAltIcon sx={{ fontSize: 18, color: "green", mr: 0.5 }} />
                <Typography variant="body2" color="green">
                    12 candidates
                </Typography>
            </Grid>
            <Grid item sx={{ borderTop: "1px solid #e0e0e0", my: 1, width: "100%" }} />
            <Grid container spacing={1}>
                <Grid item xs={6} container alignItems="center">
                    <BarChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">No experience</Typography>
                </Grid>
                <Grid item xs={6} container alignItems="center">
                    <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">Full-time</Typography>
                </Grid>
                <Grid item xs={6} container alignItems="center">
                    <PaidIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">Negotiable</Typography>
                </Grid>
                <Grid item xs={6} container alignItems="center">
                    <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">CEO</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CompanyCard