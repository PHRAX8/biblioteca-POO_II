import Axios from 'axios';
const apiUrl = process.env.GETAPIURI;

const axiosInstance = Axios.create({
  baseURL: apiUrl,
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