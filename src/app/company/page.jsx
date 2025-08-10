"use client"
import { getAllCompanyAction } from '@/redux/company/company.middleware'
import { Avatar, Button, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import CompanyCard from '../component/CompanyCard'

const Company = () => {
    const dispatch = useDispatch();
    const [companyDetails, setCompanyDetails] = useState([])
    // const 

    const fetchCompany = async () => {
        try {
            dispatch(getAllCompanyAction()).then((result) => {
                console.log("result", result)
                if (result.payload.status === 200) {
                    setCompanyDetails(result.payload.data)
                }
            }).catch((err) => {
                console.log("ERROR", err)
            });
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchCompany()
    }, [])

    console.log("companyDetails", companyDetails)

    return (
        <Grid container p={3}>
            <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"space-between"}>
                <Typography variant='h5'>Company Details</Typography>
                <Button variant='contained'>Create</Button>
            </Grid>
            <Grid size={{ xs: 12 }}>
                {companyDetails.data && companyDetails.data.length > 0 ? (
                    companyDetails.data.map((item, index) => (
                        <CompanyCard data={item} />
                    ))
                ) : (
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6">No Data Found</Typography>
                        </Grid>
                    </Grid>
                )}
            </Grid>


        </Grid>
    )
}

export default Company