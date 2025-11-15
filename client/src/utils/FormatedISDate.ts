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

export const typeLabels = {
  feeding: 'האכלה',
  sleep: 'שינה',
  diaper: 'חיתול',
};

export const typeIcons = {
  feeding: '🍼',
  sleep: '🌙',
  diaper: '👶',
};
