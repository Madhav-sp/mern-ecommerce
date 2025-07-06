import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mern-ecommerce-backend-nqxm.onrender.com/api/v1",
  withCredentials: true, // ✅ Send cookies automatically
});

export default axiosInstance;
