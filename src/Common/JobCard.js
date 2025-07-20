"use client"
import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

const JobCard = ({ data }) => {
    const router = useRouter();
    console.log("data", data?.jobs)
    return (
        <Grid container width={"100%"}>
            <Grid size={{ xs: 12, sm: 3 }} bgcolor={"red"}>
                <Typography >Left Part</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 9 }} bgcolor={"yellow"} >
                <Grid container width={"100%"} spacing={2} p={1}>
                    {data?.jobs?.map((item, index) => {
                        return (
                            <Grid size={{ xs: 12, sm: 4 }} gap={1} >
                                <Card sx={{ height: "100%", minWidth: 270 }}>
                                    <CardHeader
                                        title={item.title}
                                        subheader={new Date(item.jobPostedOn).toLocaleDateString()}
                                        slotProps={{
                                            title: {
                                                sx: { textAlign: "center" }
                                            },
                                            subheader: {
                                                sx: { textAlign: "center" }
                                            }
                                        }}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" gutterBottom>
                                            {item.description}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Category:</strong> {item.category}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Location:</strong> {item.city}, {item.location}, {item.country}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Salary:</strong>{" "}
                                            {item.fixedSalary
                                                ? `₹${item.fixedSalary}`
                                                : item.salaryFrom && item.salaryTo
                                                    ? `₹${item.salaryFrom} - ₹${item.salaryTo}`
                                                    : "Not specified"}
                                        </Typography>

                                    </CardContent>
                                    <CardActions sx={{ mt: "auto", p: 2 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            onClick={() => router.push(`/jobs/details/${item._id}`)}
                                        >
                                            View More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )

                    })}

                </Grid>
            </Grid>
        </Grid >

    );
};

export default JobCard;
