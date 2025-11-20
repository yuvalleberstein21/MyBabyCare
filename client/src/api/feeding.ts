import type { FeedingPayload, FeedingType } from '../types';
import axiosInstance from '../utils/axiosInstance';

export const createFeeding = async (
  babyId: string,
  feedingData: FeedingPayload
): Promise<FeedingType> => {
  const { data } = await axiosInstance.post(`/feed/${babyId}`, feedingData, {
    withCredentials: true,
  });
  return data;
};

// עדכון
export const updateFeeding = async (
  feedingId: string,
  feedingData: Partial<FeedingPayload>
): Promise<FeedingType> => {
  const { data } = await axiosInstance.put(`/feed/${feedingId}`, feedingData, {
    withCredentials: true,
  });
  return data;
};

// מחיקה
export const deleteFeeding = async (
  feedingId: string
): Promise<{ success: boolean }> => {
  const { data } = await axiosInstance.delete(`/feed/${feedingId}`, {
    withCredentials: true,
  });
  return data;
};
