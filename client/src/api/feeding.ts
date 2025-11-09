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
