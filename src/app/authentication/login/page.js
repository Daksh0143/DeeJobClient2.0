"use client"
import React from 'react'
import JobTextField from '@/Common/JobTextField'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useRouter } from "next/navigation"
import { useFormik } from "formik"
import * as Yup from "yup"

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),
});

const Login = () => {
    const router = useRouter()
    const { initialValues, errors, values, handleChange, handleSubmit, handleBlur, handleReset, touched } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: (value) => {
            console.log("VALUES", values)
        }
    })
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
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h5" textAlign="center">
                            Login
                        </Typography>
                        <JobTextField
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size='small'
                            error={Boolean(errors.email && touched.email)}
                            helperText={errors.email && touched.email ? errors.email : ""}
                        />
                        <JobTextField
                            label="Password"
                            name="password"
                            type="password"
                            size='small'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.password && touched.password)}
                            helperText={errors.password && touched.password ? errors.password : ""}
                        />
                        <Button variant="contained" fullWidth type='submit' >
                            Login
                        </Button>
                        <Typography
                            textAlign="right"
                            color="primary"
                            onClick={() => router.push("/authentication/register")}
                            sx={{ cursor: "pointer", my: 1 }}
                        >
                            Create an account
                        </Typography>
                    </form>
                </Box>
            </Paper>
        </Grid>
    )
}

export default Login