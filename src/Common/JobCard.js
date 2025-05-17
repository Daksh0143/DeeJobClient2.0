"use client "
import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const JobCard = ({
    title,
    description,
    createDate,
    category,
    city,
    location,
    salaryFrom,
    salaryTo,
    fixedSalary,



}) => {

    const router = useRouter()
    const renderSalary = () => {
        if (fixedSalary) {
            return `₹ ${fixedSalary}`;
        } else if (salaryFrom && salaryTo) {
            return `₹ ${salaryFrom} - ₹ ${salaryTo}`;
        } else {
            return 'Not Mentioned';
        }
    };

    return (

        <Card Card sx={{ maxWidth: 345, minWidth: 220, ml: 1, boxShadow: 3, borderRadius: 2, }}>
            <CardHeader
                sx={{ bgcolor: "#1976D2", minHeight: "120px" }}
                title={title || "Hiring juniour Developer"}  // TITLE
                subheader={createDate || "September 14, 2016"}  // createdBy
                slotProps={{
                    title: {
                        sx: {
                            textAlign: "center"
                        }
                    },
                    subheader: {
                        sx: {
                            textAlign: "center"
                        }
                    }
                }}
            />


            <CardContent>
                <Typography><span style={{ fontWeight: 600 }}>Category :</span> {category || "Jr.Softare Engineer"}</Typography>

                <Typography> <span style={{ fontWeight: 600 }}>Location : </span> {city || "Ahmedabad"} {location || "Navrangpura"}</Typography>

                <Button variant='contained' sx={{ width: "100%", mt: 1 }} onClick={() => router.push("/jobs/details")}>
                    See Details
                </Button>

            </CardContent>
        </Card >

    )
}

export default JobCard