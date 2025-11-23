import { combineDateAndTime, convertTimeToISO } from './FormatedISDate';

export const normalizeFeedingPayload = (formData) => {
  return {
    type: formData.feedingType,
    amount: Number(formData.amount),
    time: combineDateAndTime(formData.selectedDate, formData.time),
    notes: formData.notes || '',
  };
};

export const normalizeSleepingPayload = (formData) => {
  return {
    startTime: convertTimeToISO(formData.startTime),
    endTime: convertTimeToISO(formData.endTime),
    notes: formData.notes || '',
  };
};

export const normalizeDiaperPayload = (formData) => {
  return {
    time: combineDateAndTime(formData.selectedDate, formData.time),
    type: formData.diaperType,
    notes: formData.notes || '',
  };
};

export const normalizeHealthPayload = (formData) => {
  const combinedTime = combineDateAndTime(formData.selectedDate, formData.time);

  return {
    ...(combinedTime && { time: combinedTime }),
    type: formData.healthType,
    value: formData.value,
    notes: formData.notes || '',
  };
};
