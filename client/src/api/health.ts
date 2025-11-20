import axiosInstance from '../utils/axiosInstance';

interface HealthData {
  babyId: string;
  type: ['temperature', 'medicine', 'vaccine', 'checkup', 'symptom'];
  value: number | string;
  time: Date;
  notes?: string;
}
// יצירה
export const createHealth = async (healthData: HealthData) => {
  const { data } = await axiosInstance.post(`/health/`, healthData, {
    withCredentials: true,
  });
  return data;
};

// עדכון
export const updateHealth = async (
  healthId: string,
  healthData: Partial<HealthData>
) => {
  const { data } = await axiosInstance.put(`/health/${healthId}`, healthData, {
    withCredentials: true,
  });
  return data;
};

// מחיקה
export const deleteHealth = async (healthId: string) => {
  const { data } = await axiosInstance.delete(`/health/${healthId}`, {
    withCredentials: true,
  });
  return data;
};
