import { convertTimeToISO } from './FormatedISDate';

export const normalizeFeedingPayload = (formData) => {
  return {
    type: formData.feedingType,
    amount: Number(formData.amount),
    time: convertTimeToISO(formData.time),
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
    time: convertTimeToISO(formData.time),
    type: formData.diaperType,
    notes: formData.notes || '',
  };
};

export const normalizeHealthPayload = (formData) => {
  return {
    time: convertTimeToISO(formData.time),
    type: formData.healthType,
    value: formData.value,
    notes: formData.notes || '',
  };
};
