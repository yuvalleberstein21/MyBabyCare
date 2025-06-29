export function getDateRange(dateString: string): { start: Date; end: Date } {
  const start = new Date(dateString);
  const end = new Date(start);
  end.setDate(start.getDate() + 1);
  return { start, end };
}
