import Axios from 'axios';
const backendUrl = process.env.BACKENDURI;

const axiosInstance = Axios.create({
  baseURL: backendUrl+"/api",
});

// Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;