import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://blog.kata.academy/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('token');
    const configure = config;

    if (authToken && config.headers) {
      if (!configure.headers) configure.headers = {};
      configure.headers.authorization = `Bearer ${authToken}`;
    }

    return configure;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
