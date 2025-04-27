import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const JobCard = () => {

    return (

        <Card sx={{ maxWidth: 345, ml: 1, boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
                sx={{ bgcolor: "#1976D2" }}
                title="Hiring juniour Developer" // TITLE
                subheader="September 14, 2016"  // createdBy
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


            <CardContent disableSpacing>
                <Typography >
                    {/* Description */}
                    <span style={{ fontWeight: 600 }}>Description : </span>
                    Our Company is hiring 0.6-1 year experience developer
                </Typography>
                <Typography><span style={{ fontWeight: 600 }}>Category :</span> Jr.Softare Engineer</Typography>

                <Typography> <span style={{ fontWeight: 600 }}>Location : </span>  Ahmedabad Navrangpura</Typography>
                <Typography> <span style={{ fontWeight: 600 }}>Salary  : </span> 20000-40000 </Typography>



            </CardContent>
        </Card >
    )
}

export default JobCard