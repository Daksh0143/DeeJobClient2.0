import { getItem } from "@/Utills/localStorage"
import { jwtDecode } from "jwt-decode"

export const useAuth = () => {
    const token = getItem("token")
    if (!token) {
        return 
    }
    try {
        const decodeToken = jwtDecode(token)
        return { user: decodeToken }
    } catch (error) {
        console.log("ERROR", error)
        return null
    }
}