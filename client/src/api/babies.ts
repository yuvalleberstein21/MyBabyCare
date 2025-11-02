import axiosInstance from '../utils/axiosInstance';

export const getBabies = async () => {
  const { data } = await axiosInstance.get('/babies', {
    withCredentials: true,
  });
  return data;
};

export const getSingleBaby = async (babyId: string) => {
  const { data } = await axiosInstance.get(`/babies/${babyId}`, {
    withCredentials: true,
  });
  return data;
};
