"use client"
import { jobValidationSchema } from '@/app/validationSchema/jobCreate.validation'
import JobDropDown from '@/Common/JobDropDown'
import JobHeader from '@/Common/JobHeader'
import JobTextField from '@/Common/JobTextField'
import { createJobAction } from '@/redux/jobs/jobs.middleware'
import { AttachMoney, BusinessCenterSharp, LocationCity, Person, Title, Work } from '@mui/icons-material'
import { Box, Button, Grid, InputAdornment, TextareaAutosize, TextField, Typography } from '@mui/material'
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

const fieldStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        '&:hover fieldset': {
            borderColor: '#6366f1',
            borderWidth: '2px'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6366f1',
            borderWidth: '2px',
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
        }
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#6366f1'
    }
};

const categoryOptions = [
    { label: "Technology", value: "technology" },
    { label: "Marketing", value: "marketing" },
    { label: "Sales", value: "sales" },
    { label: "Design", value: "design" },
    { label: "Finance", value: "finance" },
    { label: "Human Resources", value: "hr" },
    { label: "Operations", value: "operations" },
    { label: "Customer Service", value: "customer-service" }
];


const cityOptions = [
    { label: "New York", value: "new-york" },
    { label: "San Francisco", value: "san-francisco" },
    { label: "Los Angeles", value: "los-angeles" },
    { label: "Chicago", value: "chicago" },
    { label: "Austin", value: "austin" },
    { label: "Seattle", value: "seattle" },
    { label: "Boston", value: "boston" },
    { label: "Remote", value: "remote" }
];

const jobTypeOptions = [
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Freelance", value: "freelance" },
    { label: "Internship", value: "internship" }
];


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
            <Grid container spacing={2} p={2} >
                <Grid size={{ xs: 12 }} >
                    <JobHeader title='Create a job' />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobTextField
                        label="Job Title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        startIcon={<Title />}
                        styleVariant="modern"
                        placeholder="e.g. Senior Software Engineer"
                        required
                        error={Boolean(errors.title && touched.title)}
                        helperText={errors.title && touched.title ? errors.title : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <JobTextField
                        label="Role"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        startIcon={<Person />}
                        styleVariant="modern"
                        placeholder="e.g. Backend Developer"
                        required
                        error={Boolean(errors.role && touched.role)}
                        helperText={errors.role && touched.role ? errors.role : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobDropDown
                        label="Job Category"
                        name="jobCategory"
                        // value={formData.jobTitle}
                        onChange={handleChange}
                        options={categoryOptions}
                        placeholder="Select job title"
                        startIcon={<Work />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobDropDown
                        label="City"
                        name="city"
                        // value={formData.jobTitle}
                        onChange={handleChange}
                        options={cityOptions}
                        placeholder="Select city option"
                        startIcon={<LocationCity />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobDropDown
                        label="Job Type"
                        name="jobType"
                        // value={formData.jobTitle}
                        onChange={handleChange}
                        options={jobTypeOptions}
                        placeholder="Select Job Type option"
                        startIcon={<BusinessCenterSharp />}
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
                        label="Salary Type"
                        name="salaryType"
                        // value={formData.jobTitle}
                        onChange={handleChange}
                        options={dropDownOption}
                        placeholder="Select Salary Type option"
                        startIcon={<AttachMoney />}
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
                <Grid size={{ xs: 12 }} >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                borderRadius: '16px',
                                // px: 6,
                                // py: 2,
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5b5bf6 0%, #7c3aed 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 15px 35px rgba(99, 102, 241, 0.4)',
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Work sx={{ mr: 1 }} />
                            Create Job Posting
                        </Button>
                    </Box>

                </Grid>

            </Grid>
        </form>

    )
}

export default Create