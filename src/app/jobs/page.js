"use client"
import React, { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import JobTable from '@/Common/JobTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobAction } from '@/redux/jobs/jobs.middleware';
import { jobSelector } from '@/redux/jobs/jobs.slice';
import { toast } from 'react-toastify';
import JobCard from '@/Common/JobCard';

// import JobTable from '@/Common/JobTable';


// Column Definitions: Defines the columns to be displayed.
const columnDefs = [
  { field: "title", headerName: "Title", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "city", headerName: "City", flex: 1 },
  { field: "country", headerName: "Country", flex: 1 },
  { field: "location", headerName: "Location", flex: 1 },
  { field: "salaryFrom", headerName: "Salary From", flex: 1 },
  { field: "salaryTo", headerName: "Salary To", flex: 1 },
  { field: "fixedSalary", headerName: "Fixed Salary", flex: 1 },
  { field: "description", headerName: "Description", flex: 1 },
];


const page = () => {
  const { Jobs } = useSelector(jobSelector)

  console.log("JOBS", Jobs?.jobs)



  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllJobAction({
      minSalary: 10000,
      maxSalary: 20000
    })).then((result) => {
      console.log("result", result)
      toast.success(result.payload.message)
    }).catch((err) => {
      toast.err(err.message)
    });
  }, [])

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h6' my={1} mx={4}>Jobs</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        {/* <JobTable rowData={Jobs?.jobs} columnDefs={columnDefs} /> */}
        <JobCard />
      </Grid>
    </Grid>
  )
}

export default page