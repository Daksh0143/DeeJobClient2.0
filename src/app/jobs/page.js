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

  useEffect(() => {
    dispatch(getAllJobAction()).then((result) => {
      console.log("result", result)
      toast.success(result.payload.message)
    }).catch((err) => {
      toast.err(err.message)
    });
  }, [])


  return (
    <Grid container>
      <Grid size={{ xs: 12 }} display={"flex"} alignItems={"flex-end"} justifyContent={"flex-end"} mr={4} mt={2} mb={2}>
        <Button variant='contained' onClick={()=>router.push("/jobs/create")}>Create</Button>
      </Grid>
      {Jobs?.jobs?.length > 0 && Jobs.jobs.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item._id} display={"flex"} mb={1}>
          <JobCard
            title={item.title}
            createDate={formatDateTime(item.createdAt)}
            description={item.description}
            category={item.category}
            location={item.location}
            city={item.city}
            salaryFrom={item.salaryFrom}
            salaryTo={item.salaryTo}
            fixedSalary={item.fixedSalary}
          />

        </Grid>
      ))}


    </Grid >
  )
}

export default page