"use client"
import JobHeader from '@/Common/JobHeader'
import JobTextField from '@/Common/JobTextField'
import {
    Grid,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    Divider,
    Alert,
    CardMedia,
    IconButton
} from '@mui/material'
import {
    DatePicker,
    LocalizationProvider
} from '@mui/x-date-pickers'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Save, Business, Email, LocationOn, People, Language, CalendarToday, Image, AddPhotoAlternate, Delete, Edit } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { createCompanyAction, getCompanyByIdAction, updateCompanyAction } from '@/redux/company/company.middleware'
import JobImageUpload from '@/Common/JobImageUpload'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
    const [loading, setLoading] = useState(false)
    const currentYear = dayjs()
    const dispatch = useDispatch()
    const router = useRouter()

    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const pathname = usePathname()

    const mode = pathname.includes("/edit") ? "edit" : "create"

    const formik = useFormik({
        initialValues: {
            companyName: '',
            email: '',
            address: '',
            employeeCount: '',
            websiteUrl: '',
            establishedYear: null,
            companyLogo: null
        },
        validationSchema,
        enableReinitialize: true, // Important for edit mode
        onSubmit: async (values) => {
            try {
                console.log("values", values)
                setSubmitStatus('loading')

                // Create FormData for proper binary data handling
                const formData = new FormData()

                // Add regular form fields
                formData.append('name', values.companyName)
                formData.append('email', values.email)
                formData.append('address', values.address)
                formData.append('candidate', parseInt(values.employeeCount).toString())
                formData.append('websiteUrl', values.websiteUrl)
                formData.append('billingYear', values.establishedYear ? dayjs(values.establishedYear).format('YYYY') : '')

                // Add binary image data as Blob
                if (values.companyLogo) {
                    formData.append("companyLogo", values.companyLogo);
                }

                // Add company ID for edit mode
                if (mode === "edit" && id) {
                    formData.append('id', id)
                }

                // Choose appropriate action based on mode
                const action = mode === "edit" ? updateCompanyAction : createCompanyAction
                const actionData = mode === "edit" ? { id, formData } : formData

                await dispatch(action(actionData)).then((result) => {
                    console.log("RESULT===>", result)
                    setSubmitStatus('success')
                    router.push("/company")
                    setTimeout(() => {
                        if (mode === "create") {
                            formik.resetForm()
                        }
                        setSubmitStatus(null)
                    }, 3000)
                }).catch((err) => {
                    console.log("ERROR", err)
                    setSubmitStatus('error')
                })

            } catch (error) {
                setSubmitStatus('error')
                console.error('Error submitting form:', error)
            }
        }
    })

    const findOneCompany = () => {
        dispatch(getCompanyByIdAction(id)).then((result) => {
            console.log("RESULT", result)
            if (result.payload) {
                const company = result.payload.data
                // Populate form with existing data
                formik.setValues({
                    companyName: company.name || '',
                    email: company.email || '',
                    address: company.address || '',
                    employeeCount: company.candidate || '',
                    websiteUrl: company.websiteUrl || '',
                    establishedYear: company.billingYear ? dayjs().year(company.billingYear) : null,
                    companyLogo: company?.companyLogo || ''
                })
            }
            setLoading(false)
        }).catch((err) => {
            console.log("ERROR", err)
            setLoading(false)
        });
    }

    // Load company data for edit mode
    useEffect(() => {
        if (mode === "create") return
        if (mode === "edit" && id) {
            setLoading(true)
            findOneCompany()
        }
    }, [])

    // Show loading state while fetching data in edit mode
    if (loading) {
        return (
            <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2, textAlign: 'center' }}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography>Loading company data...</Typography>
                    </CardContent>
                </Card>
            </Box>
        )
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                    {/* Header Section */}
                    <Box sx={{ mb: 3 }}>
                        <JobHeader title={mode === "create" ? "Create Company" : "Edit Company"} />
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            {mode === "create"
                                ? "Please fill in the company details below to create a new company profile."
                                : "Update the company details below to modify the company profile."
                            }
                        </Typography>
                        <Divider />
                    </Box>

                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Company {mode === "create" ? "created" : "updated"} successfully!
                        </Alert>
                    )}
                    {submitStatus === 'error' && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            Error {mode === "create" ? "creating" : "updating"} company. Please try again.
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
                                <JobImageUpload
                                    value={formik.values.companyLogo}
                                    onImageUpload={(file) => formik.setFieldValue("companyLogo", file)}
                                    error={formik.touched.companyLogo && Boolean(formik.errors.companyLogo)}
                                    helperText={formik.touched.companyLogo && formik.errors.companyLogo}
                                />
                                {formik.values.companyLogo && (
                                    <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                                        ✓ Image selected: {formik.values.companyLogo.name || 'Binary data ready'}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Submit Button */}
                            <Grid size={{ xs: 12 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 2,
                                    mt: 3,
                                    pt: 2,
                                    borderTop: 1,
                                    borderColor: 'divider'
                                }}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => router.push("/company")}
                                        sx={{
                                            minWidth: 120,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 600
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={submitStatus === 'loading'}
                                        startIcon={mode === "edit" ? <Edit /> : <Save />}
                                        sx={{
                                            minWidth: 150,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 600
                                        }}
                                    >
                                        {submitStatus === 'loading'
                                            ? (mode === "edit" ? 'Updating...' : 'Creating...')
                                            : (mode === "edit" ? 'Update Company' : 'Create Company')
                                        }
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