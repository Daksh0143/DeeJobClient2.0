import axiosInstanse from "../../axios"

const loginUrl = "/user/loginUser"


export const loginUserAsync = async (request) => {
    try {
        const response = await axiosInstanse.post(loginUrl, request)
        return response.data
    } catch (error) {
        return error
    }
}

