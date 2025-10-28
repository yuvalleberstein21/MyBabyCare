export function getDateRange(dateString: string): { start: Date; end: Date } {
  const start = new Date(dateString); // יצירת אובייקט של תאריך מתוך מחרוזת
  const end = new Date(start); // יצירת עותק
  end.setDate(start.getDate() + 1); // הוספה של יום אחד לתאריך שהמשתמש מכניס
  return { start, end }; // מחזיר אובייקט עם טווח תאריכים
}
