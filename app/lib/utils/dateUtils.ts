import { format, addDays, startOfDay, isSameDay, isBefore, isAfter } from 'date-fns';

/**
 * Formats date to YYYY-MM-DD for input fields
 */
export function formatDateForInput(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Formats date for display
 */
export function formatDateDisplay(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
}

/**
 * Formats time slot for display
 */
export function formatTimeSlot(slot: string): string {
  const [start, end] = slot.split('-');
  return `${start} - ${end}`;
}

/**
 * Gets minimum date for date picker (today)
 */
export function getMinDate(): Date {
  return startOfDay(new Date());
}

/**
 * Checks if date is in the past
 */
export function isPastDate(date: Date): boolean {
  return isBefore(startOfDay(date), startOfDay(new Date()));
}

/**
 * Gets array of next N days
 */
export function getNextDays(count: number): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < count; i++) {
    days.push(addDays(new Date(), i));
  }
  return days;
}






