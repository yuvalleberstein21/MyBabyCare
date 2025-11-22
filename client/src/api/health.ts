import type { HealthPayload, HealthRecord } from '../types';
import axiosInstance from '../utils/axiosInstance';

// יצירה
export const createHealth = async (
  babyId: string,
  healthData: HealthPayload
): Promise<HealthRecord> => {
  const { data } = await axiosInstance.post(`/health/${babyId}`, healthData, {
    withCredentials: true,
  });
  return data;
};

// עדכון
export const updateHealth = async (
  healthId: string,
  healthData: Partial<HealthPayload>
): Promise<HealthRecord> => {
  const { data } = await axiosInstance.put(`/health/${healthId}`, healthData, {
    withCredentials: true,
  });
  return data;
};

// מחיקה
export const deleteHealth = async (
  healthId: string
): Promise<{ success: boolean }> => {
  const { data } = await axiosInstance.delete(`/health/${healthId}`, {
    withCredentials: true,
  });
  return data;
};
