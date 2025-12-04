import type {
  // CompleteSleepingData,
  EndSleepingData,
  SleepSession,
  StartSleepingData,
  UpdateSleepSession,
} from '../types';
import axiosInstance from '../utils/axiosInstance';

// export const getActiveSleep = async (babyId: string) => {
//   const { data } = await axiosInstance.get(`/sleep/${babyId}/active`, {
//     withCredentials: true,
//   });
//   return data;
// };

// export const createCompleteSleeping = async (
//   babyId: string,
//   payload: CompleteSleepingData
// ) => {
//   const { data } = await axiosInstance.post(
//     `/sleep/${babyId}/complete`,
//     payload,
//     {
//       withCredentials: true,
//     }
//   );
//   return data;
// };

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

// מחיקה
export const deleteSleep = async (
  sleepId: string
): Promise<{ success: boolean }> => {
  const { data } = await axiosInstance.delete(`/sleep/${sleepId}`, {
    withCredentials: true,
  });
  return data;
};
