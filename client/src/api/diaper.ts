import type { DiaperChange, DiaperPayload } from '../types';
import axiosInstance from '../utils/axiosInstance';

//יצירה
export const createDiaper = async (
  babyId: string,
  diaperData: DiaperPayload
): Promise<DiaperChange> => {
  const { data } = await axiosInstance.post(`/diaper/${babyId}`, diaperData, {
    withCredentials: true,
  });
  return data;
};

// עדכון
export const updateDiaper = async (
  diaperId: string,
  diaperData: Partial<DiaperPayload>
): Promise<DiaperChange> => {
  const { data } = await axiosInstance.put(`/diaper/${diaperId}`, diaperData, {
    withCredentials: true,
  });
  return data;
};

// מחיקה
export const deleteDiaper = async (
  diaperId: string
): Promise<{ success: boolean }> => {
  const { data } = await axiosInstance.delete(`/diaper/${diaperId}`, {
    withCredentials: true,
  });
  return data;
};
