import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { removeItem } from "./Utills/localStorage";

const axiosInstanse = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': "application/json"
    }
})

axiosInstanse.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // or get from cookies if using SSR
        if (token) {
            try {
                const decoded = jwtDecode(token)
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    removeItem("token");
                    removeItem("token_expiry");
                    // Optional: redirect or show toast
                    window.location.href = "/authentication/login"; // or use router.push if inside React component
                    return Promise.reject("Token expired");
                }
                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                removeItem("token")
                window.location.href = "/authentication/login";
                return Promise.reject("Invalid token");
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export default axiosInstanse
