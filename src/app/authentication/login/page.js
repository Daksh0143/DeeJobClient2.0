"use client"
import React from 'react'
import JobTextField from '@/Common/JobTextField'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useRouter } from "next/navigation"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { loginUserAction } from '@/redux/user/user.middleware'
import JobDropDown from '@/Common/JobDropDown'
import { setItem } from '@/Utills/localStorage'
import { toast } from 'react-toastify'

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
    role: Yup.string()
        .required('Role is required'),
});

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const expiry = Date.now() + 8 * 60 * 60 * 1000;

    const { initialValues, errors, values, handleChange, handleSubmit, handleBlur, handleReset, touched } = useFormik({
        initialValues: {
            email: "",
            password: "",
            role: ""
        },
        validationSchema: loginSchema,
        onSubmit: (value) => {
            dispatch(loginUserAction(value)).then((result) => {
                if (result.payload.status === 200) {
                    toast.success(result.payload.message)
                    setItem("token", result.payload.data.token)
                    setItem("token-expiry", expiry)
                    router.push("/")
                }
            }).catch((err) => {
                console.log(":EROR", err)
            });
        }
    })

    const dropDownOption = [
        {
            label: "Job Seeker", value: "Job Seeker"
        },
        {
            label: "Employer", value: "Employer"
        }
    ]

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
                        <JobDropDown
                            name="role"
                            label="Role"
                            size='small'
                            options={dropDownOption}
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.role && touched.role)}
                            helperText={errors.role && touched.role ? errors.role : ""}
                        />
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