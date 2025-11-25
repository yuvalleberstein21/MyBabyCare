import type {
  EndSleepingData,
  SleepSession,
  StartSleepingData,
  UpdateSleepSession,
} from '../types';
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

export const updateSleeping = async (
  sleepId: string,
  payload: Partial<UpdateSleepSession>
): Promise<SleepSession> => {
  const { data } = await axiosInstance.put(`/sleep/${sleepId}`, payload, {
    withCredentials: true,
  });
  return data;
};
