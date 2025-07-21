"use client"
import JobCard from '@/Common/JobCard'
import { findOwnJobsAction } from '@/redux/jobs/jobs.middleware'
import { jobSelector } from '@/redux/jobs/jobs.slice'
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const MyJobs = () => {
    const dispatch = useDispatch()
    const { filters } = useSelector(jobSelector)
    const [ownJobs, setOwnJobs] = useState([])

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(findOwnJobsAction(filters)).then((res) => {
                console.log("res", res)
                if (res.payload.data.status === 200) {
                    setOwnJobs(res.payload.data.data)
                }
            })
        }, 1000);
        return () => clearTimeout(handler);
    }, [filters]);



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