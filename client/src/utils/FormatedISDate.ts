export const formatISDate = (dateStr?: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatTimeOnly = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const convertTimeToISO = (timeString: string) => {
  if (!timeString) return null;
  const today = new Date();
  const [hours, minutes] = timeString.split(':');

  today.setHours(Number(hours));
  today.setMinutes(Number(minutes));
  today.setSeconds(0);
  today.setMilliseconds(0);

  return today.toISOString();
};

export const typeLabels = {
  feeding: 'האכלה',
  sleep: 'שינה',
  diaper: 'חיתול',
  health: 'בריאות',
};

export const typeIcons = {
  feeding: '🍼',
  sleep: '🌙',
  diaper: '👶',
  health: '👨‍⚕️',
};
