import axiosInstance from '../utils/axiosInstance';

interface BabyData {
  name: string;
  gender: string;
  birthDate: string;
  weight: number;
  height: number;
  notes?: string;
  image?: string;
}

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

export const createNewBaby = async (babyData: BabyData) => {
  const { data } = await axiosInstance.post('/babies', babyData, {
    withCredentials: true,
  });
  return data;
};
