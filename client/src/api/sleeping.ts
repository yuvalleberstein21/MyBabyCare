import type { EndSleepingData, StartSleepingData } from '../types';
import axiosInstance from '../utils/axiosInstance';

export const createStartSleeping = async (
  babyId: string,
  payload: StartSleepingData
) => {
  const { data } = await axiosInstance.post(`/sleep/${babyId}/start`, payload, {
    withCredentials: true,
  });
  return data;
};

export const createEndSleeping = async (
  babyId: string,
  payload: EndSleepingData
) => {
  const { data } = await axiosInstance.post(`/sleep/${babyId}/end`, payload, {
    withCredentials: true,
  });
  return data;
};
