import axiosInstance from '../utils/axiosInstance';

interface StartSleepingData {
  startTime: string;
  notes?: string;
}

interface EndSleepingData {
  endTime: string;
}

export const createStartSleeping = async (
  babyId: string,
  sleepingData: StartSleepingData
) => {
  const { data } = await axiosInstance.post(
    `/sleep/${babyId}/start`,
    sleepingData,
    {
      withCredentials: true,
    }
  );
  return data;
};

export const createEndSleeping = async (
  babyId: string,
  sleepingData: EndSleepingData
) => {
  const { data } = await axiosInstance.post(
    `/sleep/${babyId}/end`,
    sleepingData,
    {
      withCredentials: true,
    }
  );
  return data;
};
