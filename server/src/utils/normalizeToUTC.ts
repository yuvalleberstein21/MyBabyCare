export const normalizeToUTC = (dateString: string) => {
  const local = new Date(dateString);
  return new Date(local.getTime() - local.getTimezoneOffset() * 60000);
};
