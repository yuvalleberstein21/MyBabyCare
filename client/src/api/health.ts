import axiosInstance from '../utils/axiosInstance';

interface HealthData {
  babyId: string;
  type: ['temperature', 'medicine', 'vaccine', 'checkup', 'symptom'];
  value: number | string;
  time: Date;
  notes?: string;
}

export const createHealth = async (healthData: HealthData) => {
  const { data } = await axiosInstance.post(`/health/`, healthData, {
    withCredentials: true,
  });
  return data;
};
