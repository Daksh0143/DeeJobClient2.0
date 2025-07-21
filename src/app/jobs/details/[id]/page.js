'use client'
import { findOneJobAction } from '@/redux/jobs/jobs.middleware'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const JobDetails = () => {
    const params = useParams()
    const searchParams = useSearchParams()
    const action = searchParams.get('action')

    const dispatch = useDispatch()
    const [jobData, setJobData] = useState()
    useEffect(() => {
        dispatch(findOneJobAction(params.id)).then((result) => {
            console.log("result", result.payload.data.status)
            if (result.payload.data.status === 200) {
                console.log("data", result.payload.data)
                setJobData(result.payload.data.data)
            }
        }).catch((err) => {
            console.log("ERROR")
        });
    }, [])


    return (
        <Grid container spacing={2} >
            <Grid size={{ xs: 12 }} >
                <Typography textAlign={"center"} variant='h4'>Job Details</Typography>
            </Grid>
            <Grid size={{ xs: 12 }} ml={3}>
                <Typography variant='h6'> Title:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.title}</span> </Typography>
                <Typography variant='h6'> Category:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.category}</span> </Typography>
                <Typography variant='h6'> Country:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.country}</span> </Typography>
                <Typography variant='h6'> City:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.city}</span> </Typography>
                <Typography variant='h6'> Area:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.location}</span> </Typography>
                <Typography variant='h6'> Salary:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.fixedSalary
                    ? `₹${jobData?.fixedSalary}`
                    : jobData?.salaryFrom && jobData?.salaryTo
                        ? `₹${jobData?.salaryFrom} - ₹${jobData?.salaryTo}`
                        : "Not specified"}</span> </Typography>
                <Typography variant='h6'> Posted Date:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.jobPostedOn}</span> </Typography>
            </Grid>
            {action && action === "ownJobs" && (
                <Box sx={{ gap: 2, display: "flex", pl: 2 }}>
                    <Grid size={{ xs: 12 }} bgcolor={"red"}>
                        <Button variant='contained'>Update</Button>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button variant='contained'>Delete</Button>
                    </Grid>
                </Box>
            )}
        </Grid>
    )
}

export default JobDetails