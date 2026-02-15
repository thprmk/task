'use client';

import { useState } from 'react';
import { startOfWeek, addDays, format, isSameDay, startOfDay } from 'date-fns';
import { Appointment, AppointmentStatus } from '../../../lib/types/appointment.types';
import SlotCell from './SlotCell';
import { generateSlots } from '../../lib/utils/slotManager';
import { SlotConfig } from '../../../lib/types/booking.types';

interface CalendarGridProps {
  startDate: Date;
  appointments: Appointment[];
  doctors: Array<{
    _id: string;
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
    return appointments.find(
      (apt) =>
        apt.doctorId === doctorId &&
        isSameDay(new Date(apt.date), date) &&
        apt.timeSlot === slot
    );
  };

  const getSlotsForDoctor = (doctor: typeof doctors[0], date: Date): string[] => {
    const dayOfWeek = date.getDay();
    if (doctor.weeklyOff.includes(dayOfWeek)) {
      return [];
    }

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

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        {/* Header Row */}
        <div className="grid grid-cols-8 border-b-2 border-gray-300 bg-gray-100 sticky top-0 z-10">
          <div className="p-3 font-semibold text-gray-700 border-r border-gray-300">
            Doctor / Date
          </div>
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className="p-3 text-center font-semibold text-gray-700 border-r border-gray-300 last:border-r-0"
            >
              <div className="text-xs">{format(day, 'EEE')}</div>
              <div className="text-sm">{format(day, 'MMM d')}</div>
            </div>
          ))}
        </div>

        {/* Doctor Rows */}
        {doctors.map((doctor) => (
          <div key={doctor._id} className="border-b border-gray-200">
            <div className="grid grid-cols-8">
              {/* Doctor Name Column */}
              <div className="p-3 bg-gray-50 border-r border-gray-200 sticky left-0 z-5">
                <div className="font-medium text-gray-900">{doctor.name}</div>
                <div className="text-xs text-gray-500">
                  {doctor.workingHours.start} - {doctor.workingHours.end}
                </div>
              </div>

              {/* Day Columns */}
              {days.map((day) => {
                const slots = getSlotsForDoctor(doctor, day);
                const dayAppointments = appointments.filter(
                  (apt) =>
                    apt.doctorId === doctor._id &&
                    isSameDay(new Date(apt.date), day)
                );

                return (
                  <div
                    key={`${doctor._id}-${day.toISOString()}`}
                    className="p-2 border-r border-gray-200 last:border-r-0 bg-white min-h-[200px]"
                  >
                    {slots.length > 0 ? (
                      <div className="space-y-1">
                        {slots.map((slot) => {
                          const appointment = getAppointmentForSlot(doctor._id, day, slot);
                          return (
                            <SlotCell
                              key={slot}
                              slot={slot}
                              status={appointment?.status}
                              appointmentId={appointment?._id}
                              patientName={appointment?.patient.name}
                              onClick={() =>
                                onSlotClick?.(doctor._id, day, slot, appointment)
                              }
                              isSelected={isSlotSelected(doctor._id, day, slot)}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 text-center py-4">
                        Off Day
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}






