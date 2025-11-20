import axiosInstance from '../utils/axiosInstance';

interface DiaperData {
  time: string;
  type: string;
  notes?: string;
}
//יצירה
export const createDiaper = async (babyId: string, diaperData: DiaperData) => {
  const { data } = await axiosInstance.post(`/diaper/${babyId}`, diaperData, {
    withCredentials: true,
  });
  return data;
};

// עדכון
export const updateDiaper = async (
  diaperId: string,
  diaperData: Partial<DiaperData>
) => {
  const { data } = await axiosInstance.put(`/diaper/${diaperId}`, diaperData, {
    withCredentials: true,
  });
  return data;
};

// מחיקה
export const deleteDiaper = async (diaperId: string) => {
  const { data } = await axiosInstance.delete(`/diaper/${diaperId}`, {
    withCredentials: true,
  });
  return data;
};
