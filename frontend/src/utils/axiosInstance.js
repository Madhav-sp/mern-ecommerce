import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1", // or your backend URL
  withCredentials: true, // ✅ Send cookies automatically
});

export default axiosInstance;
