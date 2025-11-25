import { combineDateAndTime } from './FormatedISDate';

export const normalizeFeedingPayload = (formData) => {
  return {
    type: formData.feedingType,
    amount: formData.amount,
    time: combineDateAndTime(formData.selectedDate, formData.time),
    notes: formData.notes || '',
  };
};

export const normalizeSleepingPayload = (formData: any) => {
  const startTime = combineDateAndTime(
    formData.selectedDate,
    formData.startTime
  );
  const endTime = combineDateAndTime(formData.selectedDate, formData.endTime);

  return {
    ...(startTime && { startTime }),
    ...(endTime && { endTime }),
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
