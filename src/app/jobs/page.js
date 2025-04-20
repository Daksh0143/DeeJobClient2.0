"use client"
import React from 'react'
import { Grid, Typography } from '@mui/material'
import JobTable from '@/Common/JobTable';
// import JobTable from '@/Common/JobTable';

const columnDefs = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'role', label: 'Role' }
];

const rowData = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
  { name: 'Charlie', email: 'charlie@example.com', role: 'Editor' }
];

const page = () => {
  return (
    <Grid container>
      <Grid size={{ xs: 12 }} bgcolor={"green"}>
        <Typography variant='h6' my={1} mx={4}>Jobs</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <JobTable rows={rowData} columns={columnDefs} title={"Job Table"} />
      </Grid>
    </Grid>
  )
}

export default page