import * as Yup from "yup"

export const jobValidationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string().min(10, 'Description must be at least 10 characters'),
    salaryType: Yup.string().required('Salary type is required'),
    salaryFrom: Yup.number()
        .when('salaryType', {
            is: 'Range Salary',
            then: (schema) => schema.required('Salary From is required').min(0),
        }),
    salaryTo: Yup.number()
        .when('salaryType', {
            is: 'Range Salary',
            then: (schema) => schema.required('Salary To is required').moreThan(
                Yup.ref('salaryFrom'),
                'Salary To must be greater than Salary From'
            ),
        }),
    fixedSalary: Yup.number().when('salaryType', {
        is: 'Fixed Salary',
        then: (schema) => schema.required('Fixed salary is required').min(0),
    }),
})