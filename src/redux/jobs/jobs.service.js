import axios from "axios";
import axiosInstanse from "../../axios"


const getAllJobUrl = "job/getAll"
const createJobUrl = "job/create"
const findOneJobUrl = "job/findOne"
const ownJobsUrl = "job/myJobs"
const updateJobUrl = "job/update"

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

export const findOneJobAsync = async (id) => {
    try {
        const response = await axiosInstanse.get(`${findOneJobUrl}/${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const ownJobsAsync = async (params) => {
    try {
        const response = await axiosInstanse.get(ownJobsUrl, { params })
        return response
    } catch (error) {
        return error
    }
}

export const updateJobAsync = async ({ id, req }) => {
    try {
        const response = await axiosInstanse.put(`${updateJobUrl}/${id}`, req)
        return response
    } catch (error) {
        return error
    }
}

