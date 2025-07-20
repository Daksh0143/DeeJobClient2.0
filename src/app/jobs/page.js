"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Slider, Typography } from '@mui/material'
import JobTable from '@/Common/JobTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobAction } from '@/redux/jobs/jobs.middleware';
import { jobSelector } from '@/redux/jobs/jobs.slice';
import { toast } from 'react-toastify';
import JobCard from '@/Common/JobCard';
import { formatDateTime } from '@/Utills/date';
import JobTextField from '@/Common/JobTextField';
import { useRouter } from 'next/navigation';


const page = () => {
  const { Jobs } = useSelector(jobSelector)
  const router = useRouter()
  const dispatch = useDispatch()
  const [jobsData, setJobsData] = useState()


  useEffect(() => {
    dispatch(getAllJobAction()).then((result) => {
      console.log("result", result)
      setJobsData(result.payload.data)
      toast.success(result.payload.message)
    }).catch((err) => {
      toast.err(err.message)
    });
  }, [])

  console.log("JOBSDAATA", jobsData)


  return (
    <Grid container spacing={2}>
      {/* Create Button */}
      <Grid
        size={{ xs: 12 }}
        display="flex"
        justifyContent="flex-end"
        pr={4}
        mt={2}
        mb={2}
        bgcolor={"yellow"}
      >
        <Button variant="contained" onClick={() => router.push("/jobs/create")}>
          Create
        </Button>
      </Grid>

      {/* Job Cards */}
      {/* <Grid size={{ xs: 12 }} display={"flex"} bgcolor={"green"}> */}
        <JobCard data={jobsData} />
      {/* </Grid> */}

    </Grid>
  )
}

export default page