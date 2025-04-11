import axiosInstanse from "../../axios"

const loginUrl = "/user/loginUser"
const registerUrl = "user/registerUser"
const profileUrl = "user/profile"

export const loginUserAsync = async (request) => {
    try {
        const response = await axiosInstanse.post(loginUrl, request)
        return response.data
    } catch (error) {
        console.log("ERROR", error)
        return error.response
    }
}

export const registerUserAsync = async (request) => {
    try {
        const response = await axiosInstanse.post(registerUrl, request)
        console.log("response", response)
        return response.data
    } catch (error) {
        return response
    }
}

export const profileAsync = async () => {
    try {
        const response = await axiosInstanse.get(profileUrl)
        return response.data
    } catch (error) {
        return error
    }
}

