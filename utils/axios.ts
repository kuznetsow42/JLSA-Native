import axios from "axios";
import * as SecureStore from "expo-secure-store";


const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.100:8000/api/v1/', 
});

axiosInstance.interceptors.request.use((config) => {
    const token = SecureStore.getItem("token");
    config.headers.token = token;
    return config;
})

export default axiosInstance;