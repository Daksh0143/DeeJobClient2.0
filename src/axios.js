import axios from "axios"

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
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export default axiosInstanse