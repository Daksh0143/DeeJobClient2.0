"use client"
import React from 'react'
import Navbar from './Navbar'
import { Grid } from '@mui/material'
import { usePathname } from 'next/navigation'

const Wrapper = ({ children }) => {
    const pathName = usePathname()

    console.log("Path name", pathName)

    const excludedPaths = ["/authentication"]

    const isExcluded = excludedPaths.some(path => pathName.startsWith(path));

    if (isExcluded) {
        return <>{children}</>
    }

    return (
        <>
            <Navbar />
            <Grid container>
                <Grid item sx={{ xs: 12 }}>
                    {children}
                </Grid>
            </Grid>
        </>

    )
}

export default Wrapper