import axiosInstanse from "../../axios"


const getAllJobUrl = "job/getAll"
const createJobUrl = "job/create"

export const getAllJobAsync = async (params) => {
    try {
        const response = await axiosInstanse.get(getAllJobUrl, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
};

export const createJobAsync = async (request) => {
    try {
        const response = await axiosInstanse.post(createJobUrl, request)
        return response.data
    } catch (error) {
        return error
    }
}