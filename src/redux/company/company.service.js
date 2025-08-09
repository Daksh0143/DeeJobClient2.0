import axiosInstanse from "../../axios"

const getCompanyUrl = "company/get"


export const getAllCompanyAsync = async () => {
    try {
        const company = await axiosInstanse(getCompanyUrl)
        console.log("company", company)
        return company
    } catch (error) {
        return error
    }
}


