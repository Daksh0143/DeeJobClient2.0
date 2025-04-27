import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

        <Card sx={{ maxWidth: 345, ml: 1, boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
                sx={{ bgcolor: "#1976D2" }}
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
                <Typography >
                    {/* Description */}
                    <span style={{ fontWeight: 600 }}>Description : </span>
                    {description || "Our Company is hiring 0.6-1 year experience developer"}
                </Typography>
                <Typography><span style={{ fontWeight: 600 }}>Category :</span> {category || "Jr.Softare Engineer"}</Typography>

                <Typography> <span style={{ fontWeight: 600 }}>Location : </span> {city || "Ahmedabad"} {location || "Navrangpura"}</Typography>

                <Typography>
                    <span style={{ fontWeight: 600 }}>Salary: </span>
                    {renderSalary()}
                </Typography>


            </CardContent>
        </Card >
    )
}

export default JobCard