import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://style-sphere-api.vercel.app",
});

export default axiosInstance;
