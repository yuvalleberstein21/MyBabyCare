export const normalizeToUTC = (isoString: string) => {
  const local = new Date(isoString);
  return new Date(
    Date.UTC(
      local.getFullYear(),
      local.getMonth(),
      local.getDate(),
      local.getHours(),
      local.getMinutes()
    )
  );
};
