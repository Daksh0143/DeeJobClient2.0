"use client"
import { getAllCompanyAction } from '@/redux/company/company.middleware'
import { Avatar, Button, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import CompanyCard from '../component/CompanyCard'

const Company = () => {
    const dispatch = useDispatch();

    const fetchCompany = async () => {
        try {
            dispatch(getAllCompanyAction())
            console.log("resposne", response)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchCompany()
    }, [])

    return (
        <Grid container p={3}>
            <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"space-between"}>
                <Typography variant='h5'>Company Details</Typography>
                <Button variant='contained'>Create</Button>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <CompanyCard />
            </Grid>
        </Grid>
    )
}

export default Company