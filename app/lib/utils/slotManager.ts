import { SlotConfig } from '../../../lib/types/booking.types';
import { isSameDay, isBefore, startOfDay, addDays, getDay } from 'date-fns';

/**
 * Generates time slots for a given day based on configuration
 */
export function generateSlots(config: SlotConfig): string[] {
  const slots: string[] = [];
  const { slotDuration, workingHours, breakTime } = config;

  // Parse working hours
  const [workStartHour, workStartMin] = workingHours.start.split(':').map(Number);
  const [workEndHour, workEndMin] = workingHours.end.split(':').map(Number);

  const workStartMinutes = workStartHour * 60 + workStartMin;
  const workEndMinutes = workEndHour * 60 + workEndMin;

  // Parse break time only if both start and end are present (doctor may have no break)
  let breakStartMinutes = 0;
  let breakEndMinutes = 0;
  if (breakTime?.start && breakTime?.end) {
    const [breakStartHour, breakStartMin] = breakTime.start.split(':').map(Number);
    const [breakEndHour, breakEndMin] = breakTime.end.split(':').map(Number);
    breakStartMinutes = breakStartHour * 60 + breakStartMin;
    breakEndMinutes = breakEndHour * 60 + breakEndMin;
  }

  // Generate slots
  let currentMinutes = workStartMinutes;

  while (currentMinutes + slotDuration <= workEndMinutes) {
    // Skip break time (only when we have valid break start/end)
    if (breakTime?.start && breakTime?.end && currentMinutes < breakEndMinutes && currentMinutes + slotDuration > breakStartMinutes) {
      currentMinutes = breakEndMinutes;
      continue;
    }

    const startHour = Math.floor(currentMinutes / 60);
    const startMin = currentMinutes % 60;
    const endMinutes = currentMinutes + slotDuration;
    const endHour = Math.floor(endMinutes / 60);
    const endMin = endMinutes % 60;

    const slot = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}-${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;
    slots.push(slot);

    currentMinutes += slotDuration;
  }

  return slots;
}

/**
 * Checks if a date is available for booking
 */
export function isDateAvailable(date: Date, config: SlotConfig): boolean {
  const today = startOfDay(new Date());
  const checkDate = startOfDay(date);

  // Cannot book past dates
  if (isBefore(checkDate, today)) {
    return false;
  }

  // Check if it's a weekly off day
  const dayOfWeek = getDay(checkDate); // 0 = Sunday, 6 = Saturday
  if (config.weeklyOff.includes(dayOfWeek)) {
    return false;
  }

  // Check if it's a holiday
  if (config.holidays.some(holiday => isSameDay(startOfDay(holiday), checkDate))) {
    return false;
  }

  return true;
}

/**
 * Checks if a slot is within working hours
 */
export function isSlotInWorkingHours(slot: string, config: SlotConfig): boolean {
  const [startTime] = slot.split('-');
  const [slotHour, slotMin] = startTime.split(':').map(Number);
  const slotMinutes = slotHour * 60 + slotMin;

  const [workStartHour, workStartMin] = config.workingHours.start.split(':').map(Number);
  const [workEndHour, workEndMin] = config.workingHours.end.split(':').map(Number);
  const workStartMinutes = workStartHour * 60 + workStartMin;
  const workEndMinutes = workEndHour * 60 + workEndMin;

  return slotMinutes >= workStartMinutes && slotMinutes + config.slotDuration <= workEndMinutes;
}

/**
 * Filters out unavailable slots (break time, outside working hours)
 */
export function getAvailableSlots(config: SlotConfig, bookedSlots: string[] = []): string[] {
  const allSlots = generateSlots(config);
  
  return allSlots.filter(slot => {
    // Check if slot is in working hours
    if (!isSlotInWorkingHours(slot, config)) {
      return false;
    }

    // Check if slot is already booked
    if (bookedSlots.includes(slot)) {
      return false;
    }

    return true;
  });
}

/**
 * Checks if a slot is already booked
 */
export function isSlotBooked(slot: string, bookedSlots: string[]): boolean {
  return bookedSlots.includes(slot);
}

