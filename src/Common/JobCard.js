"use client"
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Grid, Slider } from '@mui/material';
import { useRouter } from 'next/navigation';
import JobTextField from './JobTextField';
import JobDropDown from './JobDropDown';

const Cities = [
    { label: "Ahmedabad", value: "Ahmedabad" },
    { label: "Mumbai", value: "Mumbai" },
    { label: "Delhi", value: "Delhi" },
    { label: "Bangalore", value: "Bangalore" },
    { label: "Hyderabad", value: "Hyderabad" },
    { label: "Chennai", value: "Chennai" },
    { label: "Kolkata", value: "Kolkata" },
    { label: "Pune", value: "Pune" },
    { label: "Jaipur", value: "Jaipur" },
    { label: "Surat", value: "Surat" },
];

const Categories = [
    { label: "Software Engineer", value: "Software Engineer" },
    { label: "Frontend Developer", value: "Frontend Developer" },
    { label: "Backend Developer", value: "Backend Developer" },
    { label: "Full Stack Developer", value: "Full Stack Developer" },
    { label: "React Developer", value: "React Developer" },
    { label: "Node.js Developer", value: "Node.js Developer" },
    { label: "Human Resource", value: "Human Resource" },
    { label: "UI/UX Designer", value: "UI/UX Designer" },
    { label: "Business Analyst", value: "Business Analyst" },
    { label: "Digital Marketing", value: "Digital Marketing" },
];


const JobCard = ({ data }) => {
    const router = useRouter();
    console.log("data", data)
    const [salaryRange, setSalaryRange] = useState([0, 50000]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCategories, setSelectedCategories] = useState("")
    const handleChange = (event, newValue) => {
        setSalaryRange(newValue);
    };

    const handleInputChange = (index) => (event) => {
        const value = event.target.value === '' ? '' : Number(event.target.value);
        const newRange = [...salaryRange];
        newRange[index] = value;
        setSalaryRange(newRange);
    };
    return (
        <Grid container width={"100%"}>
            <Grid size={{ xs: 12, sm: 3 }} p={1} sx={{ position: "sticky" }} >
                <Grid container>
                    <Grid size={{ xs: 12 }}>
                        <JobTextField label={"Search"} size='small' />
                        <Slider
                            sx={{ p: 0 }}
                            value={salaryRange}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100000}
                            step={1000}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }} gap={2} display={"flex"} mt={1}>
                        <JobTextField label={"Min Salary"} size="small" type='number' fullWidth value={salaryRange[0]} onChange={handleInputChange(0)} />
                        <JobTextField label={"Max Salary"} size="small" type='number' fullWidth value={salaryRange[1]} onChange={handleInputChange(1)} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <JobDropDown name="City" label="City" options={Cities} size='small' value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} />
                        <JobDropDown name="Categories" label="Categories" options={Categories} value={selectedCategories} size='small' onChange={(e) => setSelectedCategories(e.target.value)} />
                    </Grid>

                </Grid>


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
