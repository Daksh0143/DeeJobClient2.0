import axiosInstanse from "../../axios"

const getCompanyUrl = "company/get"
const createCompanyUrl = "company/create"
const getCompanyIdUrl = "company/companyById"
const editCompanyUrl = "company/edit"
const deleteCompanyUrl = "company/delete"

export const getAllCompanyAsync = async () => {
    try {
        const company = await axiosInstanse(getCompanyUrl)
        return company.data
    } catch (error) {
        return error
    }
}

export const createCompanyAsync = async (req) => {
    try {
        // req should be a FormData object
        const response = await axiosInstanse.post(createCompanyUrl, req, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.log("ERROR", error);
    }
};

export const getCompanyByIdAsync = async (req) => {
    try {
        const response = await axiosInstanse.get(`${getCompanyIdUrl}/${req}`)
        console.log("response", response)
        return response.data
    } catch (error) {
        return error
    }
}
export const updateCompanyAsync = async ({ id, formData }, res) => {
    try {
        const response = await axiosInstanse.put(`${editCompanyUrl}/${id}`, formData)
        return response.data
    } catch (error) {
        return error
    }
}

export const deleteCompanyAsync = async (id, res) => {
    try {
        const response = await axiosInstanse.delete(`${deleteCompanyUrl}/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}