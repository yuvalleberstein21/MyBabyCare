import axiosInstance from '../utils/axiosInstance';

export const login = async (email: string, password: string) => {
  const { data } = await axiosInstance.post(
    '/auth/login',
    { email, password },
    { withCredentials: true }
  );
  return data;
};

export const register = async (
  fullName: string,
  email: string,
  password: string
) => {
  const { data } = await axiosInstance.post(
    '/auth/signup',
    { fullName, email, password },
    { withCredentials: true }
  );
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get('/auth/me', {
    withCredentials: true,
  });
  return data;
};
