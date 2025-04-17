"use client"
import React from 'react'
import JobAgGrid from '@/Common/JobAgGrid'
import { Grid, Typography } from '@mui/material'

const columnDefs = [
  { headerName: "ID", field: "id", sortable: true, filter: true },
  { headerName: "Name", field: "name", sortable: true, filter: true },
  { headerName: "Email", field: "email", sortable: true, filter: true },
  { headerName: "Role", field: "role", sortable: true, filter: true },
];

const rowData = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Manager" },
];

const page = () => {
  return (
    <Grid container>
      <Grid size={{ xs: 12 }} bgcolor={"green"}>
        <Typography variant='h6' my={1} mx={4}>Jobs</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <JobAgGrid
          rowData={rowData}
          columnDefs={columnDefs}
        />
      </Grid>
    </Grid>
  )
}

export default page