import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";

const CompanyCard = ({ data }) => {
    console.log("DATA", data)
    return (
        <Grid container spacing={2}>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                        <Grid
                            container
                            direction="column"
                            sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: 3,
                                p: 2,
                                backgroundColor: "#fff",
                                height: "100%",
                            }}
                        >
                            {/* Header */}
                            <Grid container justifyContent="space-between" alignItems="flex-start">
                                <Avatar
                                    src={
                                        item?.companyLogo ||
                                        "https://upload.wikimedia.org/wikipedia/commons/8/8e/The_North_Face_logo.svg"
                                    }
                                    variant="square"
                                    sx={{ width: 40, height: 40, borderRadius: 2 }}
                                />
                                <IconButton size="small">
                                    <MoreVertIcon />
                                </IconButton>
                            </Grid>

                            {/* Title */}
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                                {item?.name || "Company Name"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Established Year: {item?.billingYear || "N/A"}
                            </Typography>

                            {/* Candidate Count */}
                            <Grid container alignItems="center" sx={{ mt: 1 }}>
                                <PeopleAltIcon sx={{ fontSize: 18, color: "green", mr: 0.5 }} />
                                <Typography variant="body2" color="green">
                                    {item?.candidate || 0} candidates
                                </Typography>
                            </Grid>

                            {/* Divider */}
                            <Grid sx={{ borderTop: "1px solid #e0e0e0", my: 1, width: "100%" }} />

                            {/* Details */}
                            <Grid container spacing={1}>
                                <Grid size={{ xs: 6 }} container alignItems="center">
                                    <BarChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                    <Typography variant="body2">
                                        {item?.experience || "No experience"}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 6 }} container alignItems="center">
                                    <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                    <Typography variant="body2">{item?.type || "Full-time"}</Typography>
                                </Grid>
                                <Grid size={{ xs: 6 }} container alignItems="center">
                                    <PaidIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                    <Typography variant="body2">{item?.salary || "Negotiable"}</Typography>
                                </Grid>
                                <Grid size={{ xs: 6 }} container alignItems="center">
                                    <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                    <Typography variant="body2">{item?.employer.name || "CEO"}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))
            ) : (
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6" align="center">
                        No Data Found
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default CompanyCard;
