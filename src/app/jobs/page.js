"use client"
import React, { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import JobTable from '@/Common/JobTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobAction } from '@/redux/jobs/jobs.middleware';
import { jobSelector } from '@/redux/jobs/jobs.slice';

// import JobTable from '@/Common/JobTable';

const rowData = [
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];

// Column Definitions: Defines the columns to be displayed.
const columnDefs = [
  { field: "make", flex: 1 },
  { field: "model", flex: 1 },
  { field: "price", flex: 1 },
  { field: "electric", flex: 1 }
];


const page = () => {
  const { Jobs } = useSelector(jobSelector)



  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllJobAction({
      minSalary: 5000,
      maxSalary: 10000
    }))
  }, [])

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h6' my={1} mx={4}>Jobs</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <JobTable rowData={rowData} columnDefs={columnDefs} />
      </Grid>
    </Grid>
  )
}

export default page