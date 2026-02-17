'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { addWeeks, subWeeks, startOfWeek } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Appointment, AppointmentStatus } from '../../../lib/types/appointment.types';
import { Doctor } from '../../../lib/types/doctor.types';
import CalendarGrid from './CalendarGrid';
import { Button, Modal } from '../ui';
import StatusBadge from '../ui/StatusBadge';
import { formatDateDisplay, formatTimeSlot } from '../../lib/utils/dateUtils';

interface AppointmentDetails {
  appointment: Appointment;
  doctorName: string;
  departmentName: string;
}

export default function HospitalCalendar() {
  const router = useRouter();
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchData(false);
    }
  }, []);

  useEffect(() => {
    if (!isInitialMount.current) {
      fetchData(true);
    }
  }, [currentWeek]);

  const fetchData = async (isTransition: boolean = false) => {
    try {
      if (isTransition) {
        setIsTransitioning(true);
      } else {
        setLoading(true);
      }
      const weekStart = currentWeek.toISOString().split('T')[0];
      const weekEnd = new Date(currentWeek);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const weekEndStr = weekEnd.toISOString().split('T')[0];

      // Fetch doctors (only on initial load)
      if (!isTransition) {
        const doctorsRes = await fetch('/api/doctors');
        const doctorsData = await doctorsRes.json();
        if (doctorsData.success) {
          setDoctors(doctorsData.data);
        }
      }

      // Fetch appointments for the week
      const appointmentsRes = await fetch(
        `/api/appointments?dateFrom=${weekStart}&dateTo=${weekEndStr}`
      );
      const appointmentsData = await appointmentsRes.json();
      if (appointmentsData.success) {
        setAppointments(appointmentsData.data);
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    } finally {
      if (isTransition) {
        setIsTransitioning(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleSlotClick = async (
    doctorId: string,
    date: Date,
    slot: string,
    appointment?: Appointment
  ) => {
    if (appointment) {
      const aptDoctorId = typeof (appointment as any).doctorId === 'object' && (appointment as any).doctorId?._id
        ? (appointment as any).doctorId._id
        : appointment.doctorId;
      const doctor = doctors.find((d) => d._id === aptDoctorId);
      const deptId = typeof (appointment as any).departmentId === 'object' && (appointment as any).departmentId?._id
        ? (appointment as any).departmentId._id
        : appointment.departmentId;
      const deptRes = await fetch(`/api/departments`);
      const deptData = await deptRes.json();
      const department = deptData.success
        ? deptData.data.find((d: any) => d._id === deptId)
        : null;

      setSelectedAppointment({
        appointment,
        doctorName: doctor?.name || 'Unknown',
        departmentName: department?.name || 'Unknown',
      });
      setIsModalOpen(true);
    } else {
      const dateStr = date.toISOString().slice(0, 10);
      router.push(`/doctors?date=${dateStr}&doctorId=${doctorId}`);
    }
  };

  const handleStatusUpdate = async (newStatus: AppointmentStatus) => {
    if (!selectedAppointment) return;

    try {
      setUpdatingStatus(true);
      const response = await fetch(`/api/appointments/${selectedAppointment.appointment._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        // Update local state
        setAppointments((prev) =>
          prev.map((apt) =>
            apt._id === selectedAppointment.appointment._id
              ? { ...apt, status: newStatus }
              : apt
          )
        );
        setSelectedAppointment({
          ...selectedAppointment,
          appointment: { ...selectedAppointment.appointment, status: newStatus },
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handlePreviousWeek = () => {
    setSlideDirection('right');
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const handleNextWeek = () => {
    setSlideDirection('left');
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const handleToday = () => {
    const todayWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
    const todayWeekTime = todayWeek.getTime();
    const currentWeekTime = currentWeek.getTime();
    setSlideDirection(todayWeekTime < currentWeekTime ? 'right' : 'left');
    setCurrentWeek(todayWeek);
  };

  const weekEnd = new Date(currentWeek);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekRangeLabel = `${currentWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/80 flex flex-col items-center justify-center px-4">
        <div className="w-10 h-10 border-2 border-[#F05137] border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-slate-600 font-medium">Loading calendar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80 py-4 px-3 sm:py-10 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Page header + week nav */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight sm:text-3xl">Hospital Calendar</h1>
            <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">View and manage appointments by week</p>
          </div>
          <div className="flex flex-row flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm sm:px-3 sm:py-2 sm:text-sm">
              {weekRangeLabel}
            </span>
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm sm:p-1">
              <button
                type="button"
                onClick={handlePreviousWeek}
                className="p-2 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors touch-manipulation"
                aria-label="Previous week"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <Button variant="outline" size="sm" onClick={handleToday} className="rounded-md shrink-0 text-xs sm:text-sm">
                Today
              </Button>
              <button
                type="button"
                onClick={handleNextWeek}
                className="p-2 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors touch-manipulation"
                aria-label="Next week"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Legend - scroll on mobile, wrap on larger */}
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide -mx-1 px-1 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex items-center gap-x-3 gap-y-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-xs shadow-sm min-w-max sm:min-w-0 sm:flex-wrap sm:gap-x-4 sm:px-4 sm:py-3 sm:text-sm">
            <span className="font-medium text-slate-600 shrink-0">Status</span>
            {[
              { color: 'bg-green-50 border-green-200', label: 'Available' },
              { color: 'bg-amber-50 border-amber-200', label: 'Pending' },
              { color: 'bg-blue-50 border-blue-200', label: 'Confirmed' },
              { color: 'bg-slate-100 border-slate-200', label: 'Completed' },
              { color: 'bg-red-50 border-red-200', label: 'Cancelled' },
              { color: 'bg-orange-50 border-orange-200', label: 'No Show' },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1.5 shrink-0 sm:gap-2">
                <span className={`inline-block h-4 w-4 rounded border sm:h-5 sm:w-5 sm:rounded-md ${color}`} />
                <span className="text-slate-600">{label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Calendar grid card - horizontal scroll on mobile */}
        <div className="rounded-lg border border-slate-200/80 bg-white shadow-md overflow-hidden sm:rounded-xl relative">
          <p className="sr-only">Scroll horizontally to see all days</p>
          <span className="absolute top-11 right-2 z-20 hidden text-[10px] text-slate-400 sm:hidden pointer-events-none">
            Scroll →
          </span>
          {/* Subtle loading overlay during transitions */}
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-30 flex items-center justify-center pointer-events-none"
            >
              <div className="w-8 h-8 border-2 border-[#F05137] border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentWeek.getTime()}
              initial={{ opacity: 0, x: slideDirection === 'left' ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDirection === 'left' ? -30 : 30 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <CalendarGrid
                startDate={currentWeek}
                appointments={appointments}
                doctors={doctors}
                onSlotClick={handleSlotClick}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Appointment Details Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Appointment Details"
          size="md"
        >
          {selectedAppointment && (
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex justify-between sm:flex-col gap-1">
                  <span className="text-slate-500 text-sm">Status</span>
                  <StatusBadge status={selectedAppointment.appointment.status} />
                </div>
                <div className="flex justify-between sm:flex-col gap-1">
                  <span className="text-slate-500 text-sm">Doctor</span>
                  <span className="font-medium text-slate-900">{selectedAppointment.doctorName}</span>
                </div>
                <div className="flex justify-between sm:flex-col gap-1">
                  <span className="text-slate-500 text-sm">Department</span>
                  <span className="font-medium text-slate-900">{selectedAppointment.departmentName}</span>
                </div>
                <div className="flex justify-between sm:flex-col gap-1">
                  <span className="text-slate-500 text-sm">Date</span>
                  <span className="font-medium text-slate-900">
                    {formatDateDisplay(selectedAppointment.appointment.date)}
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col gap-1">
                  <span className="text-slate-500 text-sm">Time</span>
                  <span className="font-medium text-slate-900">
                    {formatTimeSlot(selectedAppointment.appointment.timeSlot)}
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col gap-1 sm:col-span-2">
                  <span className="text-slate-500 text-sm">Patient</span>
                  <span className="font-medium text-slate-900">
                    {selectedAppointment.appointment.patient.name}
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col gap-1 sm:col-span-2">
                  <span className="text-slate-500 text-sm">Phone</span>
                  <span className="font-medium text-slate-900">
                    {selectedAppointment.appointment.patient.phone}
                  </span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="text-slate-500 text-sm block mb-1">Reason for visit</span>
                <span className="text-slate-700 text-sm">{selectedAppointment.appointment.patient.reason}</span>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-700 mb-3">Update status</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAppointment.appointment.status !== AppointmentStatus.CONFIRMED && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStatusUpdate(AppointmentStatus.CONFIRMED)}
                      disabled={updatingStatus}
                    >
                      Confirm
                    </Button>
                  )}
                  {selectedAppointment.appointment.status !== AppointmentStatus.COMPLETED && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStatusUpdate(AppointmentStatus.COMPLETED)}
                      disabled={updatingStatus}
                    >
                      Mark Completed
                    </Button>
                  )}
                  {selectedAppointment.appointment.status !== AppointmentStatus.CANCELLED && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleStatusUpdate(AppointmentStatus.CANCELLED)}
                      disabled={updatingStatus}
                    >
                      Cancel
                    </Button>
                  )}
                  {selectedAppointment.appointment.status !== AppointmentStatus.NO_SHOW && (
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






