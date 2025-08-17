"use client"
import JobHeader from '@/Common/JobHeader'
import JobImageUpload from '@/Common/JobImageUpload'
import JobTextField from '@/Common/JobTextField'
import {
    Grid,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    Divider,
    Alert
} from '@mui/material'
import {
    DatePicker,
    LocalizationProvider
} from '@mui/x-date-pickers'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Save, Business, Email, LocationOn, People, Language, CalendarToday, Image } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { createCompanyAction } from '@/redux/company/company.middleware'

// Validation schema
const validationSchema = Yup.object({
    companyName: Yup.string()
        .min(2, 'Company name must be at least 2 characters')
        .max(100, 'Company name must be less than 100 characters')
        .required('Company name is required'),
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Company email is required'),
    address: Yup.string()
        .min(10, 'Address must be at least 10 characters')
        .required('Company address is required'),
    employeeCount: Yup.number()
        .min(1, 'Employee count must be at least 1')
        .max(1000000, 'Employee count seems too high')
        .required('Employee count is required'),
    websiteUrl: Yup.string()
        .url('Please enter a valid URL')
        .required('Website URL is required'),
    establishedYear: Yup.date()
        .max(new Date(), 'Established year cannot be in the future')
        .required('Established year is required')
})

const CompanyForm = () => {
    const [submitStatus, setSubmitStatus] = useState(null)
    const currentYear = dayjs()

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            companyName: '',
            email: '',
            address: '',
            employeeCount: '',
            websiteUrl: '',
            establishedYear: null,
            logo: null
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log("values", values)
                setSubmitStatus('loading')

                // Prepare payload with proper formatting
                const payload = {
                    name: values.companyName,
                    email: values.email,
                    address: values.address,
                    candidate: parseInt(values.employeeCount),
                    websiteUrl: values.websiteUrl,
                    billingYear: values.establishedYear ? dayjs(values.establishedYear).format('YYYY') : null,
                    companyLogo: values.logo // This will contain the actual file object
                }

                await new Promise(resolve => setTimeout(resolve, 1000))

                await dispatch(createCompanyAction(payload)).then((result) => {
                    console.log("RESULT===>", result)
                }).catch((err) => {
                    console.log("ERRORR", err)
                });

                // console.log('Company Form Payload:', payload)
                // console.log('Image file:', payload.logo)
                // console.log('Established Year (string):', payload.establishedYear)

                // setSubmitStatus('success')

                // // Reset form after successful submission
                // setTimeout(() => {
                //     formik.resetForm()
                //     setSubmitStatus(null)
                // }, 3000)


            } catch (error) {
                setSubmitStatus('error')
                console.error('Error submitting form:', error)
            }
        }
    })

    console.log("SUBMIT STATUS", submitStatus)

    const handleImageUpload = (file) => {
        // Set the actual file object to formik state
        // This will be available in the payload as values.logo
        formik.setFieldValue('logo', file)
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                    {/* Header Section */}
                    <Box sx={{ mb: 3 }}>
                        <JobHeader title="Create Company" />
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            Please fill in the company details below to create a new company profile.
                        </Typography>
                        <Divider />
                    </Box>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            Company created successfully!
                        </Alert>
                    )}
                    {submitStatus === 'error' && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            Error creating company. Please try again.
                        </Alert>
                    )}

                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Basic Information Section */}
                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Business sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="h6" color="primary">
                                        Basic Information
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Company Name */}
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <JobTextField
                                    label="Company Name"
                                    name="companyName"
                                    value={formik.values.companyName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    size="small"
                                    fullWidth
                                    error={Boolean(formik.errors.companyName && formik.touched.companyName)}
                                    helperText={formik.errors.companyName && formik.touched.companyName ? formik.errors.companyName : ""}
                                    InputProps={{
                                        startAdornment: (
                                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                                <Business fontSize="small" color="action" />
                                            </Box>
                                        )
                                    }}
                                />
                            </Grid>

                            {/* Company Email */}
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <JobTextField
                                    name="email"
                                    label="Company Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    size="small"
                                    fullWidth
                                    type="email"
                                    error={Boolean(formik.errors.email && formik.touched.email)}
                                    helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                                    InputProps={{
                                        startAdornment: (
                                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                                <Email fontSize="small" color="action" />
                                            </Box>
                                        )
                                    }}
                                />
                            </Grid>

                            {/* Company Address */}
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <JobTextField
                                    name="address"
                                    label="Company Address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    size="small"
                                    fullWidth
                                    multiline
                                    rows={1}
                                    error={Boolean(formik.errors.address && formik.touched.address)}
                                    helperText={formik.errors.address && formik.touched.address ? formik.errors.address : ""}
                                    InputProps={{
                                        startAdornment: (
                                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                                <LocationOn fontSize="small" color="action" />
                                            </Box>
                                        )
                                    }}
                                />
                            </Grid>

                            {/* Additional Details Section */}
                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
                                    <People sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="h6" color="primary">
                                        Company Details
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Employee Count */}
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <JobTextField
                                    name="employeeCount"
                                    label="Number of Employees"
                                    value={formik.values.employeeCount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    size="small"
                                    fullWidth
                                    type="number"
                                    error={Boolean(formik.errors.employeeCount && formik.touched.employeeCount)}
                                    helperText={formik.errors.employeeCount && formik.touched.employeeCount ? formik.errors.employeeCount : ""}
                                    InputProps={{
                                        startAdornment: (
                                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                                <People fontSize="small" color="action" />
                                            </Box>
                                        )
                                    }}
                                />
                            </Grid>

                            {/* Website URL */}
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <JobTextField
                                    name="websiteUrl"
                                    label="Website URL"
                                    value={formik.values.websiteUrl}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    size="small"
                                    fullWidth
                                    placeholder="https://example.com"
                                    error={Boolean(formik.errors.websiteUrl && formik.touched.websiteUrl)}
                                    helperText={formik.errors.websiteUrl && formik.touched.websiteUrl ? formik.errors.websiteUrl : ""}
                                    InputProps={{
                                        startAdornment: (
                                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                                <Language fontSize="small" color="action" />
                                            </Box>
                                        )
                                    }}
                                />
                            </Grid>

                            {/* Established Year */}
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Established Year"
                                        value={formik.values.establishedYear}
                                        onChange={(value) => formik.setFieldValue('establishedYear', value)}
                                        maxDate={currentYear}
                                        openTo="year"
                                        views={['year']}
                                        yearsOrder="desc"
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                fullWidth: true,
                                                error: Boolean(formik.errors.establishedYear && formik.touched.establishedYear),
                                                helperText: formik.errors.establishedYear && formik.touched.establishedYear ? formik.errors.establishedYear : "",
                                                InputProps: {
                                                    startAdornment: (
                                                        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                                            <CalendarToday fontSize="small" color="action" />
                                                        </Box>
                                                    )
                                                }
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            {/* Logo Upload Section */}
                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
                                    <Image sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="h6" color="primary">
                                        Company Logo
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Box sx={{
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    p: 2,
                                    minHeight: 120,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <JobImageUpload
                                        onImageUpload={handleImageUpload}
                                        error={Boolean(formik.errors.logo && formik.touched.logo)}
                                        helperText={formik.errors.logo && formik.touched.logo ? formik.errors.logo : "Upload your company logo"}
                                    />
                                    {formik.values.logo && (
                                        <Typography variant="caption" color="success.main" sx={{ mt: 1 }}>
                                            ✓ Image selected: {formik.values.logo.name || 'Image file'}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>

                            {/* Submit Button */}
                            <Grid size={{ xs: 12 }}>
                                {JSON.stringify(formik.errors)}
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    mt: 3,
                                    pt: 2,
                                    borderTop: 1,
                                    borderColor: 'divider'
                                }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={submitStatus === 'loading'}
                                        startIcon={<Save />}
                                        sx={{
                                            minWidth: 150,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 600
                                        }}
                                    >
                                        {submitStatus === 'loading' ? 'Creating...' : 'Create Company'}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CompanyForm