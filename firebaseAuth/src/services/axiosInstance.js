import axios from 'axios';
// const baseURL = 'https://firebase-auth-backend.onrender.com/api/v1';
const baseURL = 'http://10.0.2.2:5000/api/v1';
const   axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
