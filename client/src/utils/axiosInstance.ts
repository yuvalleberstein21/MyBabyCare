import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// אינטרספטור לטיפול בשגיאות
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const skipUrls = [
      '/auth/login',
      '/auth/register',
      '/auth/refresh-token',
      '/auth/me',
    ];
    const shouldSkip = skipUrls.some((url) =>
      originalRequest.url?.includes(url)
    );

    if (error.response?.status === 401 && !shouldSkip) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        return axiosInstance(originalRequest);
      } catch {
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(error);
      }
    }

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      'אירעה שגיאה בלתי צפויה';

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
