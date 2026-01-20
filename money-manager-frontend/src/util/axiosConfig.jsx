import axios from "axios"
import { BASE_URL } from "./apiEndPoints";
import toast from "react-hot-toast";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    withCredentials: true,
});



//no need to send JWT token to these end points
const excludeEndPoints = ["/login", "/register", "/status", "/activate", "/health"]


//request interceptor
axiosConfig.interceptors.request.use(
    (config) => {
        const skipToken = excludeEndPoints.some((endpoint) => {
            return config.url?.includes(endpoint)
        });

        if (!skipToken) {
            const accessToken = localStorage.getItem("token");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


//response interceptor
axiosConfig.interceptors.response.use(

    (response) => {
        return response;
    },

    (error) => {
        if (error.response) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");

                toast.error("Session expired. Please login again");

                setTimeout(() => {
                    window.location.replace("/login");
                }, 800);

            } else if (error.response.status === 500) {
                //console.error("Server Error. Please try again later ");
                toast.error("Server error. Please try again later");
            }
        } else if (error.code === "ECONNABORTED") {
            //console.error("Request timeout. Please try again.");
            toast.error("Request timeout. Please try again");
        }

        return Promise.reject(error);

    }

);


export default axiosConfig;
