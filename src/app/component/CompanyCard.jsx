import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Avatar,
    Grid,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";

const CompanyCard = ({ data, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event, itemId) => {
        console.log("ITEM ID", itemId)
        setAnchorEl(event.currentTarget);
        setSelectedItemId(itemId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedItemId(null);
    };

    const handleEdit = () => {
        if (onEdit && selectedItemId !== null) {
            onEdit(selectedItemId);
        }
        handleMenuClose();
    };

    const handleDelete = () => {
        if (onDelete && selectedItemId !== null) {
            onDelete(selectedItemId);
        }
        handleMenuClose();
    };

    return (
        <>
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
                                    <IconButton
                                        size="small"
                                        onClick={(event) => handleMenuClick(event, item)}
                                        sx={{
                                            backgroundColor: open && selectedItemId === index ? '#f3f4f6' : 'transparent',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                backgroundColor: '#f9fafb',
                                                borderColor: '#d1d5db',
                                                transform: 'scale(1.05)',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: '#6b7280',
                                                fontSize: '18px'
                                            }
                                        }}
                                    >
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
                                        <Typography variant="body2">{item?.employer?.name || "CEO"}</Typography>
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

            {/* Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        minWidth: 140,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        border: '1px solid #f0f0f0',
                        '& .MuiMenuItem-root': {
                            borderRadius: 1,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: '#f8f9fa',
                                transform: 'translateX(4px)',
                            },
                        },
                    }
                }}
            >
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon sx={{ minWidth: 12 }}>
                        <EditIcon
                            fontSize="small"
                            sx={{
                                color: '#2563eb',
                                fontSize: '18px'
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary="Edit"
                        sx={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#374151'
                        }}

                    />
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                        <DeleteIcon
                            fontSize="small"
                            sx={{
                                color: '#dc2626',
                                fontSize: '18px'
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary="Delete"
                        sx={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#374151'
                        }}
                    />
                </MenuItem>
            </Menu>
        </>
    );
};

export default CompanyCard;