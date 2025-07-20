"use client"
import JobCard from '@/Common/JobCard'
import { findOwnJobsAction } from '@/redux/jobs/jobs.middleware'
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const MyJobs = () => {
    const dispatch = useDispatch()
    const [ownJobs, setOwnJobs] = useState([])

    useEffect(() => {
        dispatch(findOwnJobsAction()).then((res) => {
            console.log("res", res)
            if (res.payload.data.status === 200) {
                setOwnJobs(res.payload.data.data)
            }
        })
    }, [])



    return (
        <Grid container>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h5' p={1}>My Jobs</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <JobCard data={ownJobs} />
            </Grid>
        </Grid>
    )
}

export default MyJobs