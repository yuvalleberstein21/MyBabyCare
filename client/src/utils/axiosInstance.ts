import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // רשימת URLs שלא צריכים refresh אוטומטי
    const noRefreshUrls = [
      '/auth/login',
      '/auth/register',
      '/auth/refresh-token',
    ];
    const shouldSkipRefresh = noRefreshUrls.some((url) =>
      originalRequest.url?.includes(url)
    );

    // אם השגיאה היא 401 והבקשה לא נכשלה כבר בניסיון refresh
    // ולא מדובר בבקשה שלא צריכה refresh
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh
    ) {
      if (isRefreshing) {
        // אם כבר מתבצע refresh, נמתין לסיום
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // ניסיון לרענן את ה-access token
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // אם ה-refresh נכשל, ננקה את המשתמש (logout)
        window.dispatchEvent(new Event('auth:logout'));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // טיפול בשגיאות אחרות
    if (err.response) {
      const message =
        err.response.data?.error ||
        err.response.data?.message ||
        'אירעה שגיאה בלתי צפויה';

      // יצירת אובייקט Error עם המסר המקורי
      const error = new Error(message);
      (error as any).response = err.response;
      (error as any).status = err.response.status;
      return Promise.reject(error);
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
