import axiosInstanse from "@/axios"

const GetAllCityUrl = "/city/get"

export const GetAllCityAsync = async (req, res) => {
    try {
        const response = await axiosInstanse(GetAllCityUrl)
        console.log("RESPONSE", response)
        return response.data
    } catch (error) {
        return error
    }
}