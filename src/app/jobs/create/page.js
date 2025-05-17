"use client"
import { jobValidationSchema } from '@/app/validationSchema/jobCreate.validation'
import JobDropDown from '@/Common/JobDropDown'
import JobTextField from '@/Common/JobTextField'
import { createJobAction } from '@/redux/jobs/jobs.middleware'
import { Box, Button, Grid, TextareaAutosize, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const dropDownOption = [
    { label: "Range Salary", value: "Range Salary" },
    { label: "Fixed Salary", value: "Fixed Salary" }
]

const initialValues = {
    title: '',
    category: '',
    country: '',
    city: '',
    location: '',
    description: '',
    salaryType: '',
    salaryFrom: '',
    salaryTo: '',
    fixedSalary: '',
};


const Create = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { values, handleChange, handleBlur, touched, errors, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: jobValidationSchema,
        onSubmit: (values) => {
            dispatch(createJobAction(values))
                .then((res) => {
                    if (res.payload.status === 200) {
                        router.back()
                        toast.success(res.payload.message);
                    }
                })
        }
    })
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} >
                <Grid size={{ xs: 12 }} textAlign={"center"}>
                    <Typography variant='h3' mt={4}>CREATE A JOB</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobTextField
                        label="Title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size='small'
                        error={Boolean(errors.title && touched.title)}
                        helperText={errors.title && touched.title ? errors.title : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobTextField
                        label="Category"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size='small'
                        error={Boolean(errors.category && touched.category)}
                        helperText={errors.category && touched.category ? errors.category : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobTextField
                        label="Country"
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size='small'
                        error={Boolean(errors.country && touched.country)}
                        helperText={errors.country && touched.country ? errors.country : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobTextField
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size='small'
                        error={Boolean(errors.city && touched.city)}
                        helperText={errors.city && touched.city ? errors.city : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobTextField
                        label="location"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size='small'
                        error={Boolean(errors.location && touched.location)}
                        helperText={errors.location && touched.location ? errors.location : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextareaAutosize
                        minRows={3}
                        name="description"
                        placeholder="Description"
                        style={{ width: '100%', padding: 8 }}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.description && errors.description && (
                        <Typography color="error" fontSize={12}>
                            {errors.description}
                        </Typography>
                    )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobDropDown
                        name="salaryType"
                        label="Salary Type"
                        size="small"
                        value={values.salaryType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={dropDownOption}
                        error={Boolean(errors.salaryType && touched.salaryType)}
                        helperText={touched.salaryType && errors.salaryType}
                    />
                </Grid>


                <Grid size={{ xs: 12, sm: 6 }}>
                    {values.salaryType === 'Range Salary' && (
                        <Box sx={{ display: 'flex', gap: 1 }}>

                            <JobTextField
                                label="Salary From"
                                name="salaryFrom"
                                value={values.salaryFrom}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                size="small"
                                error={Boolean(errors.salaryFrom && touched.salaryFrom)}
                                helperText={touched.salaryFrom && errors.salaryFrom}
                            />

                            <JobTextField
                                label="Salary To"
                                name="salaryTo"
                                value={values.salaryTo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                size="small"
                                error={Boolean(errors.salaryTo && touched.salaryTo)}
                                helperText={touched.salaryTo && errors.salaryTo}
                            />

                        </Box>
                    )}
                    {values.salaryType === 'Fixed Salary' && (
                        <JobTextField
                            label="Fixed Salary"
                            name="fixedSalary"
                            value={values.fixedSalary}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size="small"
                            error={Boolean(errors.fixedSalary && touched.fixedSalary)}
                            helperText={touched.fixedSalary && errors.fixedSalary}
                        />
                    )}

                </Grid>
                <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"center"} alignItems={"flex-end"}>
                    <Button type="submit" variant='contained'>Submit</Button>
                </Grid>

            </Grid>
        </form>

    )
}

export default Create