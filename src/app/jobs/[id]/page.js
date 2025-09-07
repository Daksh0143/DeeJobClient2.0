"use client";
import { jobValidationSchema } from "@/app/validationSchema/jobCreate.validation";
import JobDropDown from "@/Common/JobDropDown";
import JobHeader from "@/Common/JobHeader";
import JobTextField from "@/Common/JobTextField";
import { GetCategoriesAction } from "@/redux/categories/categories.middleware";
import { GetAllCityAction } from "@/redux/city/city.middleware";
import { getCompanyByLoggedInUserAction } from "@/redux/company/company.middleware";
import {
    createJobAction,
    findOneJobAction,
    updateJobsAction
} from "@/redux/jobs/jobs.middleware";
import {
    AttachMoney,
    BusinessCenterSharp,
    LocationCity,
    Person,
    Title,
    Work,
    Edit,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Grid,
    TextareaAutosize,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter, usePathname, useSearchParams, useParams } from "next/navigation";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const salaryTypeOptions = [
    { label: "Range Salary", value: "Range Salary" },
    { label: "Fixed Salary", value: "Fixed Salary" },
];

const jobTypeOptions = [
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Freelance", value: "freelance" },
    { label: "Internship", value: "internship" },
    { label: "Remote", value: "remote" },
];

const experienceOptions = [
    { label: "Fresher", value: "fresher" },
    { label: "Internship", value: "internship" },
    { label: "Freelance", value: "freelance" },
    { label: "0 - 1 Year", value: "0-1" },
    { label: "1 - 2 Years", value: "1-2" },
    { label: "2 - 3 Years", value: "2-3" },
    { label: "3 - 5 Years", value: "3-5" },
    { label: "5 - 7 Years", value: "5-7" },
    { label: "7 - 10 Years", value: "7-10" },
    { label: "10+ Years", value: "10+" },
];

const initialValues = {
    title: "",
    category: "",
    description: "",
    company: "",
    city: "",
    jobRole: "",
    jobType: "",
    salaryFrom: "",
    salaryTo: "",
    fixedSalary: "",
    experience: "",
    salaryType: "",
};

const Create = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useParams();

    // State management
    const [cityOptions, setCityOptions] = useState([]);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingJobData, setIsLoadingJobData] = useState(false);

    // Determine if we're in edit mode and get job ID
    const isEditMode = useMemo(() => {
        // Edit mode: /jobs/edit with query param OR /jobs/edit/id
        return params.id === 'edit' || (params.id === 'edit' && searchParams.get('id'));
    }, [params.id, searchParams]);

    const jobId = useMemo(() => {
        // For edit mode, get ID from query params
        if (params.id === 'edit') {
            return searchParams.get('id');
        }
        return null;
    }, [params.id, searchParams]);

    const formik = useFormik({
        initialValues,
        validationSchema: jobValidationSchema,
        enableReinitialize: true, // Important for edit mode
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setIsSubmitting(true);
                console.log("Submitting values:", values);

                let res;
                if (isEditMode && jobId) {
                    // Update existing job
                    res = await dispatch(updateJobsAction({
                        id: jobId,
                        req: values
                    }));
                } else {
                    // Create new job
                    res = await dispatch(createJobAction(values));
                }

                if (res.payload?.status === 200) {
                    const message = isEditMode ? "Job updated successfully!" : "Job created successfully!";
                    toast.success(res.payload.message || message);
                    router.push("/jobs");
                } else {
                    const errorMessage = isEditMode ? "Failed to update job" : "Failed to create job";
                    toast.error(res.payload?.message || errorMessage);
                }
            } catch (error) {
                console.error("Job submission error:", error);
                const errorMessage = isEditMode ? "An error occurred while updating the job" : "An error occurred while creating the job";
                toast.error(errorMessage);
            } finally {
                setIsSubmitting(false);
                setSubmitting(false);
            }
        },
    });

    const { values, handleChange, handleBlur, touched, errors, handleSubmit, setFieldValue, setValues } = formik;

    // Handle salary type change to clear relevant fields
    const handleSalaryTypeChange = useCallback((event) => {
        const newSalaryType = event.target.value;
        setFieldValue("salaryType", newSalaryType);

        // Clear salary fields when type changes
        if (newSalaryType === "Fixed Salary") {
            setFieldValue("salaryFrom", "");
            setFieldValue("salaryTo", "");
        } else if (newSalaryType === "Range Salary") {
            setFieldValue("fixedSalary", "");
        }
    }, [setFieldValue]);

    // Fetch job data for edit mode
    const fetchJobData = useCallback(async (id) => {
        if (!id) return;

        try {
            setIsLoadingJobData(true);
            const res = await dispatch(findOneJobAction(id));

            if (res.payload?.status === 200 && res.payload?.data) {
                const jobData = res.payload.data;

                // Map the job data to form values
                const formattedData = {
                    title: jobData.title || "",
                    category: jobData.category?._id || jobData.category || "",
                    description: jobData.description || "",
                    company: jobData.company?._id || jobData.company || "",
                    city: jobData.city?._id || jobData.city || "",
                    jobRole: jobData.jobRole || "",
                    jobType: jobData.jobType || "",
                    salaryFrom: jobData.salaryFrom || "",
                    salaryTo: jobData.salaryTo || "",
                    fixedSalary: jobData.fixedSalary || "",
                    experience: jobData.experience || "",
                    salaryType: jobData.salaryType || "",
                };

                setValues(formattedData);
            } else {
                toast.error("Failed to fetch job data");
                router.push("/jobs");
            }
        } catch (error) {
            console.error("Error fetching job data:", error);
            toast.error("Error loading job data");
            router.push("/jobs");
        } finally {
            setIsLoadingJobData(false);
        }
    }, [dispatch, setValues, router]);

    // Fetch initial dropdown data
    const fetchInitialData = useCallback(async () => {
        try {
            setIsLoading(true);

            const [cityRes, companyRes, categoryRes] = await Promise.allSettled([
                dispatch(GetAllCityAction()),
                dispatch(getCompanyByLoggedInUserAction()),
                dispatch(GetCategoriesAction())
            ]);

            // Handle cities
            if (cityRes.status === 'fulfilled' && cityRes.value?.payload?.data) {
                const formatted = cityRes.value.payload.data.map((city) => ({
                    label: city.name,
                    value: city._id,
                }));
                setCityOptions(formatted);
            } else {
                console.error("Failed to fetch cities:", cityRes.reason);
            }

            // Handle companies
            if (companyRes.status === 'fulfilled' && companyRes.value?.payload?.data) {
                const formatted = companyRes.value.payload.data.map((company) => ({
                    label: company.name,
                    value: company._id,
                }));
                setCompanyOptions(formatted);
            } else {
                console.error("Failed to fetch companies:", companyRes.reason);
            }

            // Handle categories
            if (categoryRes.status === 'fulfilled' && categoryRes.value?.payload?.data) {
                const formatted = categoryRes.value.payload.data.map((cat) => ({
                    label: cat.name,
                    value: cat._id,
                }));
                setCategoryOptions(formatted);
            } else {
                console.error("Failed to fetch categories:", categoryRes.reason);
            }
        } catch (error) {
            console.error("Error fetching initial data:", error);
            toast.error("Failed to load form data");
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    // Main useEffect for initialization
    useEffect(() => {
        const initialize = async () => {
            // First fetch dropdown data
            await fetchInitialData();

            // Then fetch job data if in edit mode
            if (isEditMode && jobId) {
                await fetchJobData(jobId);
            }
        };

        initialize();
    }, [fetchInitialData, fetchJobData, isEditMode, jobId]);

    // Validate required data for edit mode
    useEffect(() => {
        if (isEditMode && !jobId) {
            toast.error("Job ID is required for editing");
            router.push("/jobs");
        }
    }, [isEditMode, jobId, router]);

    if (isLoading || isLoadingJobData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
                <Typography ml={2}>
                    {isLoadingJobData ? "Loading job data..." : "Loading form data..."}
                </Typography>
            </Box>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} p={2}>
                <Grid size={{ xs: 12 }}>
                    <JobHeader title={isEditMode ? "Edit Job" : "Create a job"} />
                </Grid>

                {/* Title */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobTextField
                        label="Job Title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        startIcon={<Title />}
                        placeholder="e.g. Senior Software Engineer"
                        required
                        error={Boolean(errors.title && touched.title)}
                        helperText={touched.title && errors.title}
                    />
                </Grid>

                {/* Role */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobTextField
                        label="Role"
                        name="jobRole"
                        value={values.jobRole}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        startIcon={<Person />}
                        placeholder="e.g. Backend Developer"
                        required
                        error={Boolean(errors.jobRole && touched.jobRole)}
                        helperText={touched.jobRole && errors.jobRole}
                    />
                </Grid>

                {/* Category */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobDropDown
                        label="Job Category"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={categoryOptions}
                        placeholder="Select job category"
                        startIcon={<Work />}
                        required
                        error={Boolean(errors.category && touched.category)}
                        helperText={touched.category && errors.category}
                    />
                </Grid>

                {/* Company */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobDropDown
                        label="Company"
                        name="company"
                        value={values.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={companyOptions}
                        placeholder="Select Company"
                        startIcon={<Work />}
                        required
                        error={Boolean(errors.company && touched.company)}
                        helperText={touched.company && errors.company}
                    />
                </Grid>

                {/* Experience */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobDropDown
                        label="Experience"
                        name="experience"
                        value={values.experience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={experienceOptions}
                        placeholder="Select Experience"
                        startIcon={<Work />}
                        required
                        error={Boolean(errors.experience && touched.experience)}
                        helperText={touched.experience && errors.experience}
                    />
                </Grid>

                {/* City */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobDropDown
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={cityOptions}
                        placeholder="Select city"
                        startIcon={<LocationCity />}
                        required
                        error={Boolean(errors.city && touched.city)}
                        helperText={touched.city && errors.city}
                    />
                </Grid>

                {/* Job Type */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobDropDown
                        label="Job Type"
                        name="jobType"
                        value={values.jobType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={jobTypeOptions}
                        placeholder="Select Job Type"
                        startIcon={<BusinessCenterSharp />}
                        required
                        error={Boolean(errors.jobType && touched.jobType)}
                        helperText={touched.jobType && errors.jobType}
                    />
                </Grid>

                {/* Description */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" fontWeight={600} mb={1}>
                        Job Description *
                    </Typography>
                    <TextareaAutosize
                        minRows={4}
                        name="description"
                        placeholder="Job Description"
                        style={{
                            width: "100%",
                            padding: 8,
                            borderColor: errors.description && touched.description ? '#d32f2f' : '#ccc',
                            borderRadius: '4px',
                            fontFamily: 'inherit'
                        }}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.description && errors.description && (
                        <Typography color="error" fontSize={12} mt={0.5}>
                            {errors.description}
                        </Typography>
                    )}
                </Grid>

                {/* Salary Type */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <JobDropDown
                        label="Salary Type"
                        name="salaryType"
                        value={values.salaryType}
                        onChange={handleSalaryTypeChange}
                        onBlur={handleBlur}
                        options={salaryTypeOptions}
                        placeholder="Select Salary Type"
                        startIcon={<AttachMoney />}
                        required
                        error={Boolean(errors.salaryType && touched.salaryType)}
                        helperText={touched.salaryType && errors.salaryType}
                    />
                </Grid>

                {/* Salary Fields */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    {values.salaryType === "Range Salary" && (
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <JobTextField
                                label="Salary From"
                                name="salaryFrom"
                                type="number"
                                value={values.salaryFrom}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                size="small"
                                required
                                error={Boolean(errors.salaryFrom && touched.salaryFrom)}
                                helperText={touched.salaryFrom && errors.salaryFrom}
                            />
                            <JobTextField
                                label="Salary To"
                                name="salaryTo"
                                type="number"
                                value={values.salaryTo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                size="small"
                                required
                                error={Boolean(errors.salaryTo && touched.salaryTo)}
                                helperText={touched.salaryTo && errors.salaryTo}
                            />
                        </Box>
                    )}

                    {values.salaryType === "Fixed Salary" && (
                        <JobTextField
                            label="Fixed Salary"
                            name="fixedSalary"
                            type="number"
                            value={values.fixedSalary}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size="small"
                            required
                            error={Boolean(errors.fixedSalary && touched.fixedSalary)}
                            helperText={touched.fixedSalary && errors.fixedSalary}
                        />
                    )}
                </Grid>

                {/* Submit Button */}
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            sx={{
                                background:
                                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                borderRadius: "16px",
                                fontSize: "18px",
                                fontWeight: "bold",
                                textTransform: "none",
                                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #5b5bf6 0%, #7c3aed 100%)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 15px 35px rgba(99, 102, 241, 0.4)",
                                },
                                "&:disabled": {
                                    background: "#ccc",
                                    transform: "none",
                                    boxShadow: "none",
                                },
                                transition: "all 0.3s ease",
                                minWidth: "200px",
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                    {isEditMode ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                <>
                                    {isEditMode ? <Edit sx={{ mr: 1 }} /> : <Work sx={{ mr: 1 }} />}
                                    {isEditMode ? "Update Job Posting" : "Create Job Posting"}
                                </>
                            )}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default Create;