import type { Baby } from '../types';
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

export const createNewBaby = async (babyData: Baby) => {
  const { data } = await axiosInstance.post('/babies', babyData, {
    withCredentials: true,
  });
  return data;
};

export const updateBabyApi = async (babyId: string, babyData: Baby) => {
  const { data } = await axiosInstance.put(`/babies/${babyId}`, babyData, {
    withCredentials: true,
  });
  return data;
};

export const deleteBabyApi = async (babyId: string) => {
  const { data } = await axiosInstance.delete(`/babies/${babyId}`, {
    withCredentials: true,
  });
  return data;
};
