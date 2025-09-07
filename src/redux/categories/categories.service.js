import axiosInstanse from "@/axios"

const GetCategoriesUrl = "/categories/getCategories"

export const GetCategoriesAsync = async (req, res) => {
    try {
        const response = await axiosInstanse.get(GetCategoriesUrl)
        return response.data
    } catch (error) {
        return error
    }
}