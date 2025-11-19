import axiosInstance from '../utils/axiosInstance';

interface FeedingData {
  type: string;
  amount: number;
  time: string;
  notes?: string;
}

export const createFeeding = async (
  babyId: string,
  feedingData: FeedingData
) => {
  const { data } = await axiosInstance.post(`/feed/${babyId}`, feedingData, {
    withCredentials: true,
  });
  return data;
};

// עדכון
export const updateFeeding = async (
  feedingId: string,
  feedingData: Partial<FeedingData>
) => {
  const { data } = await axiosInstance.put(`/feed/${feedingId}`, feedingData, {
    withCredentials: true,
  });
  return data;
};

// מחיקה
export const deleteFeeding = async (feedingId: string) => {
  const { data } = await axiosInstance.delete(`/feed/${feedingId}`, {
    withCredentials: true,
  });
  return data;
};
