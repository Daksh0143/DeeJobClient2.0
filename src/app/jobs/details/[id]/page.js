'use client'
import { findOneJobAction } from '@/redux/jobs/jobs.middleware'
import { Grid, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const JobDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [jobData, setJobData] = useState()
    console.log("PARAMS====>", params)
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

    console.log("JOB DATA", jobData?.title)

    return (
        <Grid container >
            <Grid size={{ xs: 12 }} >
                <Typography textAlign={"center"} variant='h4'>Job Details</Typography>
            </Grid>
            <Grid size={{ xs: 12 }} ml={3}>
                <Typography variant='h6'> Title:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.title}</span> </Typography>
                <Typography variant='h6'> Category:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.category}</span> </Typography>
                <Typography variant='h6'> Country:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.country}</span> </Typography>
                <Typography variant='h6'> City:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.city}</span> </Typography>
                <Typography variant='h6'> Area:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.location}</span> </Typography>
                <Typography variant='h6'> Salary:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.salaryFrom}-{jobData?.salaryTo}</span> </Typography>
                <Typography variant='h6'> Posted Date:-  <span style={{ fontSize: "18px", color: "blue" }}>{jobData?.jobPostedOn}</span> </Typography>
            </Grid>
        </Grid>
    )
}

export default JobDetails