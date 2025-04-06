"use client"
import JobDropDown from '@/Common/JobDropDown'
import JobTextField from '@/Common/JobTextField'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { registerUserAction } from '@/redux/user/user.middleware'
import { toast } from "react-toastify"

const dropDownOption = [
    { label: "Job Seeker", value: "Job Seeker" },
    { label: "Employer", value: "Employer" }
]

// ✅ Validation schema
const registerSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")
        .required("Confirm password is required"),
})

const Register = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            role: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            const { confirmPassword, ...payload } = values
            dispatch(registerUserAction(payload)).then((result) => {
                console.log("RESULT", result)
                if (result.payload.status === 200) {
                    toast.success(result.payload.message)
                    router.push("/authentication/login")
                }
            }).catch((err) => {
                console.log("ERRR", err)
            });
        }
    })

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik

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
                            Register
                        </Typography>

                        <JobTextField
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size='small'
                            error={Boolean(errors.name && touched.name)}
                            helperText={errors.name && touched.name ? errors.name : ""}
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
                            label="Phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size='small'
                            error={Boolean(errors.phone && touched.phone)}
                            helperText={errors.phone && touched.phone ? errors.phone : ""}
                        />
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
                        <JobTextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            size='small'
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                            helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}
                        />
                        <Button variant="contained" fullWidth type='submit'>
                            Register
                        </Button>
                        <Typography
                            textAlign="right"
                            color="primary"
                            onClick={() => router.push("/authentication/login")}
                            sx={{ cursor: "pointer", my: 1 }}
                        >
                            Already have an account? Login
                        </Typography>
                    </form>
                </Box>
            </Paper>
        </Grid>
    )
}

export default Register
