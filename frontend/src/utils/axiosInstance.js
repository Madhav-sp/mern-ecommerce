import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
  baseURL: "https://mern-ecommerce-backend-nqxm.onrender.com/api/v1",
  withCredentials: true, // ✅ Send cookies automatically
});

export default axiosInstance;
