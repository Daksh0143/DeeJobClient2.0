"use client"
import JobTextField from '@/Common/JobTextField'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from "next/navigation"

const Login = () => {
    const router = useRouter()
    return (
        <Grid
            container
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, width: 350, borderRadius: 3 }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Typography variant="h5" textAlign="center">
                        Login
                    </Typography>
                    <JobTextField
                        label="Email"
                        name="email"
                        onChange={(e) => console.log("Email:", e.target.value)}
                    />
                    <JobTextField
                        label="Password"
                        name="password"
                        type="password"
                        onChange={(e) => console.log("Password:", e.target.value)}
                    />
                    <Button variant="contained" fullWidth>
                        Login
                    </Button>
                    <Typography
                        textAlign="center"
                        color="primary"
                        onClick={() => router.push("/authentication/register")}
                        sx={{ cursor: "pointer" }}
                    >
                        Create an account
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    )
}

export default Login