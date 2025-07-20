"use client"
import { findOwnJobsAction } from '@/redux/jobs/jobs.middleware'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const MyJobs = () => {
    const dispatch = useDispatch()
    const [ownJobs, setOwnJobs] = useState([])

    useEffect(() => {
        dispatch(findOwnJobsAction()).then((res) => {
            if (res.payload.data.status === 200) {
                setOwnJobs(res.payload.data.data)
            }
        })
    }, [])
    return (
        <Grid container>
            <Grid size={{xs:12}}>
                
            </Grid>
        </Grid>
    )
}

export default MyJobs