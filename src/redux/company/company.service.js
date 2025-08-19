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

