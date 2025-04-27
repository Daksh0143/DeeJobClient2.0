import axiosInstanse from "../../axios"

const getAllJobUrl = "job/getAll"


export const getAllJobAsync = async (params) => {
    try {
        const response = await axiosInstanse.get(getAllJobUrl, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error; 
    }
};