'use client';

import { useState } from 'react';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';
import { Appointment, AppointmentStatus } from '../../../lib/types/appointment.types';
import SlotCell from './SlotCell';
import { generateSlots } from '../../lib/utils/slotManager';
import { SlotConfig } from '../../../lib/types/booking.types';
import { isHoliday } from '../../../lib/holidays';
import { formatDateForInput } from '../../lib/utils/dateUtils';

/** Normalize doctorId from API (may be populated object or string) */
function getDoctorId(apt: Appointment): string {
  const d = (apt as any).doctorId;
  if (typeof d === 'object' && d !== null && d._id) return d._id;
  return (apt.doctorId as string);
}

interface CalendarGridProps {
  startDate: Date;
  appointments: Appointment[];
  doctors: Array<{
    _id?: string;
    name: string;
    workingHours: { start: string; end: string };
    breakTime?: { start: string; end: string };
    weeklyOff: number[];
  }>;
  slotDuration?: number;
  onSlotClick?: (doctorId: string, date: Date, slot: string, appointment?: Appointment) => void;
  selectedSlot?: { doctorId: string; date: Date; slot: string };
}

export default function CalendarGrid({
  startDate,
  appointments,
  doctors,
  slotDuration = 30,
  onSlotClick,
  selectedSlot,
}: CalendarGridProps) {
  const weekStart = startOfWeek(startDate, { weekStartsOn: 0 }); // Sunday
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getAppointmentForSlot = (doctorId: string, date: Date, slot: string): Appointment | undefined => {
    const dateStr = formatDateForInput(date);
    return appointments.find((apt) => {
      const aptDoctorId = getDoctorId(apt);
      const aptDateStr =
        typeof apt.date === 'string'
          ? apt.date.slice(0, 10)
          : formatDateForInput(new Date(apt.date));
      return aptDoctorId === doctorId && aptDateStr === dateStr && apt.timeSlot === slot;
    });
  };

  const getSlotsForDoctor = (doctor: typeof doctors[0], date: Date): string[] => {
    const dayOfWeek = date.getDay();
    if (doctor.weeklyOff.includes(dayOfWeek)) return [];
    if (isHoliday(date)) return [];

    const config: SlotConfig = {
      slotDuration,
      workingHours: doctor.workingHours,
      breakTime: doctor.breakTime,
      weeklyOff: doctor.weeklyOff,
      holidays: [],
    };
    return generateSlots(config);
  };

  const isSlotSelected = (doctorId: string, date: Date, slot: string): boolean => {
    return (
      selectedSlot?.doctorId === doctorId &&
      isSameDay(selectedSlot.date, date) &&
      selectedSlot.slot === slot
    );
  };

  const today = new Date();
  const isToday = (d: Date) => format(d, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');

  return (
    <div className="overflow-x-auto overflow-y-hidden -mx-px scrollbar-hide">
      <div className="min-w-[640px] sm:min-w-full">
        {/* Header Row - sticky, min widths for scroll */}
        <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50/95 sticky top-0 z-10 min-h-[52px] sm:min-h-[60px]">
          <div className="px-2 py-2.5 font-semibold text-slate-700 text-xs border-r border-slate-200 sm:px-3 sm:py-3.5 sm:text-sm">
            Doctor / Date
          </div>
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={`px-1 py-2.5 text-center border-r border-slate-200 last:border-r-0 sm:px-2 sm:py-3.5 ${
                isToday(day) ? 'bg-[#F05137]/5 text-[#F05137] font-semibold' : 'text-slate-700 font-medium'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider opacity-90 sm:text-xs">{format(day, 'EEE')}</div>
              <div className="text-xs mt-0.5 sm:text-sm">{format(day, 'MMM d')}</div>
            </div>
          ))}
        </div>

        {/* Doctor Rows */}
        {doctors.map((doctor, index) => {
          const doctorId = doctor._id ?? `doc-${index}`;
          return (
            <div key={doctorId} className="border-b border-slate-100 last:border-b-0">
              <div className="grid grid-cols-8">
                {/* Doctor Name Column - sticky left */}
                <div className="px-2 py-2 bg-slate-50/90 border-r border-slate-100 sticky left-0 z-5 sm:px-3 sm:py-3">
                  <div className="font-medium text-slate-900 text-xs truncate sm:text-sm" title={doctor.name}>{doctor.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 sm:text-xs">
                    {doctor.workingHours.start} – {doctor.workingHours.end}
                  </div>
                </div>

                {/* Day Columns */}
                {days.map((day) => {
                  const slots = getSlotsForDoctor(doctor, day);
                  return (
                    <div
                      key={`${doctorId}-${day.toISOString()}`}
                      className={`p-1.5 border-r border-slate-100 last:border-r-0 min-h-[180px] sm:p-2 sm:min-h-[200px] ${
                        isToday(day) ? 'bg-slate-50/30' : 'bg-white'
                      }`}
                    >
                      {slots.length > 0 ? (
                        <div className="space-y-1 sm:space-y-1.5">
                          {slots.map((slot) => {
                            const appointment = getAppointmentForSlot(doctorId, day, slot);
                            return (
                              <SlotCell
                                key={slot}
                                slot={slot}
                                status={appointment?.status}
                                appointmentId={appointment?._id}
                                patientName={appointment?.patient.name}
                                onClick={() =>
                                  onSlotClick?.(doctorId, day, slot, appointment)
                                }
                                isSelected={isSlotSelected(doctorId, day, slot)}
                              />
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-400 text-center py-4 italic sm:py-6 sm:text-xs">
                          Off day
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
