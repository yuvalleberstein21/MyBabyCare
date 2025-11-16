import axiosInstance from '../utils/axiosInstance';

interface DiaperData {
  time: string;
  type: string;
  notes?: string;
}

export const createDiaper = async (babyId: string, diaperData: DiaperData) => {
  const { data } = await axiosInstance.post(`/diaper/${babyId}`, diaperData, {
    withCredentials: true,
  });
  return data;
};
