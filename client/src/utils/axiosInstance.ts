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

    // לא מנסים לרענן ב־login/register/refresh-token
    const skipUrls = ['/auth/login', '/auth/register', '/auth/refresh-token'];
    const shouldSkip = skipUrls.some((url) =>
      originalRequest.url?.includes(url)
    );

    if (error.response?.status === 401 && !shouldSkip) {
      try {
        // מנסים לרענן טוקן
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        // חוזרים לבצע את הבקשה המקורית
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // אם רענון נכשל → יוצרים אירוע logout
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(refreshError);
      }
    }

    // כל שגיאה אחרת
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      'אירעה שגיאה בלתי צפויה';
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
