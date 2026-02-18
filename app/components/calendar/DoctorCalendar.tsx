'use client';

import { useState, useEffect, useRef } from 'react';
import { addWeeks, subWeeks, startOfWeek, format, isSameDay } from 'date-fns';
import { Appointment, AppointmentStatus } from '../../../lib/types/appointment.types';
import { Doctor } from '../../../lib/types/doctor.types';
import { useAppointmentStore } from '../../lib/stores/appointmentStore';
import { Card, Button, Modal, Select } from '../ui';
import StatusBadge from '../ui/StatusBadge';
import SlotCell from './SlotCell';
import { formatDateDisplay, formatDateForInput, formatTimeSlot } from '../../lib/utils/dateUtils';
import { generateSlots } from '../../lib/utils/slotManager';
import { SlotConfig } from '../../../lib/types/booking.types';

interface DoctorCalendarProps {
  doctorId: string;
}

export default function DoctorCalendar({ doctorId }: DoctorCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const invalidationVersion = useAppointmentStore((s) => s.appointmentInvalidationVersion);
  const prevInvalidationRef = useRef(0);

  useEffect(() => {
    fetchData();
  }, [doctorId, currentWeek]);

  useEffect(() => {
    if (invalidationVersion > prevInvalidationRef.current) {
      prevInvalidationRef.current = invalidationVersion;
      fetchData();
    }
  }, [invalidationVersion]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch doctor details
      const doctorsRes = await fetch('/api/doctors');
      const doctorsData = await doctorsRes.json();
      if (doctorsData.success) {
        const foundDoctor = doctorsData.data.find((d: Doctor) => d._id === doctorId);
        setDoctor(foundDoctor || null);
      }

      // Fetch appointments for the week (use local calendar dates so API matches)
      const weekEnd = new Date(currentWeek);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const dateFrom = formatDateForInput(currentWeek);
      const dateTo = formatDateForInput(weekEnd);

      const appointmentsRes = await fetch(
        `/api/appointments?doctorId=${doctorId}&dateFrom=${dateFrom}&dateTo=${dateTo}`
      );
      const appointmentsData = await appointmentsRes.json();
      if (appointmentsData.success) {
        setAppointments(appointmentsData.data);
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSlotClick = (date: Date, slot: string, appointment?: Appointment) => {
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsModalOpen(true);
    }
  };

  const handleStatusUpdate = async (newStatus: AppointmentStatus) => {
    if (!selectedAppointment) return;

    try {
      setUpdatingStatus(true);
      const response = await fetch(`/api/appointments/${selectedAppointment._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((apt) =>
            apt._id === selectedAppointment._id ? { ...apt, status: newStatus } : apt
          )
        );
        setSelectedAppointment({ ...selectedAppointment, status: newStatus });
        useAppointmentStore.getState().bumpAppointmentInvalidation();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const handleToday = () => {
    setCurrentWeek(startOfWeek(new Date(), { weekStartsOn: 0 }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading calendar...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Doctor not found</p>
      </div>
    );
  }

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  const getSlotsForDay = (date: Date): string[] => {
    const dayOfWeek = date.getDay();
    if (doctor.weeklyOff.includes(dayOfWeek)) {
      return [];
    }

    const config: SlotConfig = {
      slotDuration: doctor.slotDuration ?? 30,
      workingHours: doctor.workingHours,
      breakTime: doctor.breakTime,
      weeklyOff: doctor.weeklyOff,
      holidays: [],
    };

    return generateSlots(config);
  };

  // Get slot list from first working day so grid has rows even when week starts on off day
  const firstWorkingDay = days.find((d) => !doctor.weeklyOff.includes(d.getDay()));
  const slotList = firstWorkingDay ? getSlotsForDay(firstWorkingDay) : [];

  const getAppointmentForSlot = (date: Date, slot: string): Appointment | undefined => {
    const dateStr = formatDateForInput(date);
    return appointments.find((apt) => {
      const aptDateStr = formatDateForInput(new Date(apt.date));
      return aptDateStr === dateStr && apt.timeSlot === slot;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-gray-600">{doctor.specialization}</p>
              <p className="text-sm text-gray-500">
                Working Hours: {doctor.workingHours.start} - {doctor.workingHours.end}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePreviousWeek}>
                ← Previous
              </Button>
              <Button variant="outline" onClick={handleToday}>
                Today
              </Button>
              <Button variant="outline" onClick={handleNextWeek}>
                Next →
              </Button>
            </div>
          </div>
        </Card>

        {/* Legend: Visual slot status */}
        <div className="mb-4 flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm">
          <span className="font-medium text-gray-700">Slot status:</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-6 w-6 rounded border-2 border-green-300 bg-green-50" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-6 w-6 rounded border-2 border-blue-300 bg-blue-50" />
            Booked
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-6 w-6 rounded border-2 border-gray-300 bg-gray-100" />
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-6 w-6 rounded border-2 border-red-300 bg-red-50" />
            Cancelled
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-6 w-6 rounded border-2 border-orange-300 bg-orange-50" />
            No Show
          </span>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header Row */}
              <div className="grid grid-cols-8 border-b-2 border-gray-300 bg-gray-100">
                <div className="p-3 font-semibold text-gray-700 border-r border-gray-300">
                  Time
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

              {/* Time Slots */}
              {slotList.length > 0 && (
                <div className="divide-y divide-gray-200">
                  {slotList.map((slot) => (
                    <div key={slot} className="grid grid-cols-8">
                      {/* Time Column */}
                      <div className="p-3 bg-gray-50 border-r border-gray-200 sticky left-0 z-5">
                        <div className="font-medium text-gray-900 text-sm">
                          {formatTimeSlot(slot)}
                        </div>
                      </div>

                      {/* Day Columns */}
                      {days.map((day) => {
                        const appointment = getAppointmentForSlot(day, slot);
                        const isOffDay = doctor.weeklyOff.includes(day.getDay());

                        return (
                          <div
                            key={`${day.toISOString()}-${slot}`}
                            className="p-2 border-r border-gray-200 last:border-r-0 bg-white"
                          >
                            {isOffDay ? (
                              <div className="text-xs text-gray-400 text-center py-2">
                                Off
                              </div>
                            ) : (
                              <SlotCell
                                slot={slot}
                                status={appointment?.status}
                                appointmentId={appointment?._id}
                                patientName={appointment?.patient.name}
                                onClick={() => handleSlotClick(day, slot, appointment)}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Appointment Details Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Appointment Details"
          size="md"
        >
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <StatusBadge status={selectedAppointment.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {formatDateDisplay(selectedAppointment.date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">
                    {formatTimeSlot(selectedAppointment.timeSlot)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient:</span>
                  <span className="font-medium">{selectedAppointment.patient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">{selectedAppointment.patient.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium">{selectedAppointment.patient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{selectedAppointment.patient.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{selectedAppointment.patient.email}</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-gray-600 block mb-1">Reason:</span>
                  <span className="text-sm">{selectedAppointment.patient.reason}</span>
                </div>
              </div>

              {/* Status Update */}
              <div className="pt-4 border-t space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Update Status:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAppointment.status !== AppointmentStatus.CONFIRMED && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStatusUpdate(AppointmentStatus.CONFIRMED)}
                      disabled={updatingStatus}
                    >
                      Confirm
                    </Button>
                  )}
                  {selectedAppointment.status !== AppointmentStatus.COMPLETED && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStatusUpdate(AppointmentStatus.COMPLETED)}
                      disabled={updatingStatus}
                    >
                      Mark Completed
                    </Button>
                  )}
                  {selectedAppointment.status !== AppointmentStatus.CANCELLED && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleStatusUpdate(AppointmentStatus.CANCELLED)}
                      disabled={updatingStatus}
                    >
                      Cancel
                    </Button>
                  )}
                  {selectedAppointment.status !== AppointmentStatus.NO_SHOW && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(AppointmentStatus.NO_SHOW)}
                      disabled={updatingStatus}
                    >
                      No Show
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
