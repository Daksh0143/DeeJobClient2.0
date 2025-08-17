import { Grid, Typography } from '@mui/material'
import React from 'react'

const JobHeader = ({ title }) => {
    return (
        <Grid container>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h5'>{title}</Typography>
            </Grid>
        </Grid>
    )
}

export default JobHeader