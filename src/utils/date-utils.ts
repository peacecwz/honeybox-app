export function addDayToDate(date: Date, days: number): Date {
  const currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate;
}

export function getDates(startDate: Date, endDate: Date): Array<string> {
  const dates: Array<string> = [];
  let currentDate: Date = startDate;
  while (currentDate <= endDate) {
    dates.push(dateToString(currentDate));
    currentDate = addDayToDate(currentDate, 1);
  }
  return dates;
}

export function dateToString(date: Date) {
  return date.toISOString().split('T')[0];
}
