import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api', // Ensure the baseURL is correct
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
