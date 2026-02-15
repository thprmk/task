'use client';

import { useState, useEffect } from 'react';
import { addWeeks, subWeeks, startOfWeek } from 'date-fns';
import { Appointment, AppointmentStatus } from '../../../lib/types/appointment.types';
import { Doctor } from '../../../lib/types/doctor.types';
import CalendarGrid from './CalendarGrid';
import { Card, Button, Modal } from '../ui';
import StatusBadge from '../ui/StatusBadge';
import { formatDateDisplay, formatTimeSlot } from '../../lib/utils/dateUtils';

interface AppointmentDetails {
  appointment: Appointment;
  doctorName: string;
  departmentName: string;
}

export default function HospitalCalendar() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentWeek]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const weekStart = currentWeek.toISOString().split('T')[0];
      const weekEnd = new Date(currentWeek);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const weekEndStr = weekEnd.toISOString().split('T')[0];

      // Fetch doctors
      const doctorsRes = await fetch('/api/doctors');
      const doctorsData = await doctorsRes.json();
      if (doctorsData.success) {
        setDoctors(doctorsData.data);
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
      setLoading(false);
    }
  };

  const handleSlotClick = async (
    doctorId: string,
    date: Date,
    slot: string,
    appointment?: Appointment
  ) => {
    if (appointment) {
      // Find doctor and department names
      const doctor = doctors.find((d) => d._id === appointment.doctorId);
      const deptRes = await fetch(`/api/departments`);
      const deptData = await deptRes.json();
      const department = deptData.success
        ? deptData.data.find((d: any) => d._id === appointment.departmentId)
        : null;

      setSelectedAppointment({
        appointment,
        doctorName: doctor?.name || 'Unknown',
        departmentName: department?.name || 'Unknown',
      });
      setIsModalOpen(true);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Hospital Calendar</h1>
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

        <Card>
          <CalendarGrid
            startDate={currentWeek}
            appointments={appointments}
            doctors={doctors}
            onSlotClick={handleSlotClick}
          />
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
                  <StatusBadge status={selectedAppointment.appointment.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">{selectedAppointment.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{selectedAppointment.departmentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {formatDateDisplay(selectedAppointment.appointment.date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">
                    {formatTimeSlot(selectedAppointment.appointment.timeSlot)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient:</span>
                  <span className="font-medium">
                    {selectedAppointment.appointment.patient.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">
                    {selectedAppointment.appointment.patient.phone}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-gray-600 block mb-1">Reason:</span>
                  <span className="text-sm">{selectedAppointment.appointment.patient.reason}</span>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="pt-4 border-t space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Update Status:</p>
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






