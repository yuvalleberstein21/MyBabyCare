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
    hour12: false,
    timeZone: 'UTC',
  });
};

export const formatToHHMM = (iso: string) => {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(
    d.getMinutes()
  ).padStart(2, '0')}`;
};

export const combineDateAndTime = (date: string, time: string) => {
  if (!date || !time) return undefined;

  const [hours, minutes] = time.split(':');
  const dt = new Date(date);
  dt.setHours(Number(hours), Number(minutes), 0, 0);
  return dt.toISOString();
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
