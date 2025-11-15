import axiosInstance from '../utils/axiosInstance';

export const getDailySummary = async (babyId: string, date: string) => {
  const { data } = await axiosInstance.get(`/daily-summary/${babyId}`, {
    params: { date },
    withCredentials: true,
  });
  return data;
};
