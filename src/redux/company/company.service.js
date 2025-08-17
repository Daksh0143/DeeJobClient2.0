import axiosInstanse from "../../axios"

const getCompanyUrl = "company/get"
const createCompanyUrl = "company/create"


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
        const response = await axiosInstanse.post(createCompanyUrl, req)
        return response.data
    } catch (error) {
        console.log("ERROR", error)
    }
}


