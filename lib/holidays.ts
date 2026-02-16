/**
 * Holiday dates for slot/calendar logic (blocked for booking).
 * Replace with API/DB when you have a holidays collection.
 */
export function getHolidays(): Date[] {
  const holidays: Date[] = [];
  // Example: add fixed holidays if needed
  // holidays.push(new Date('2026-01-01')); // New Year
  // holidays.push(new Date('2026-12-25')); // Christmas
  return holidays;
}

/** Check if a date is a holiday (compare date part only). */
export function isHoliday(date: Date, holidayList: Date[] = getHolidays()): boolean {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return holidayList.some((h) => {
    const hd = new Date(h);
    hd.setHours(0, 0, 0, 0);
    return d.getTime() === hd.getTime();
  });
}
