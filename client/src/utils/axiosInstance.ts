import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      // הודעה שמגיעה מהשרת עצמו
      const message =
        err.response.data?.error ||
        err.response.data?.message ||
        'An unexpected error occurred';
      return Promise.reject(new Error(message));
    }
  }
);

export default axiosInstance;
