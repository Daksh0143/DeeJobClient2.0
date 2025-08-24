import axiosInstanse from "../../axios"

const getCompanyUrl = "company/get"
const createCompanyUrl = "company/create"
const getCompanyIdUrl = "company/companyById"
const editCompanyUrl = "company/edit"


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
        console.log("KJBJDSLCB",id)
        const response = await axiosInstanse.put(`${editCompanyUrl}/${id}`, formData)
        return response.data
    } catch (error) {
        return error
    }
}