'use client';

import { Appointment } from '../../../lib/types/appointment.types';
import { formatDateDisplay, formatTimeSlot } from '../../lib/utils/dateUtils';
import { Card, StatusBadge } from '../ui';
import Button from '../ui/Button';
import Link from 'next/link';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusUpdate?: (id: string, status: string) => void;
}

export default function AppointmentCard({ appointment, onStatusUpdate }: AppointmentCardProps) {
  const doctorName = typeof appointment.doctorId === 'object' && appointment.doctorId
    ? appointment.doctorId.name
    : 'Unknown Doctor';
  
  const departmentName = typeof appointment.departmentId === 'object' && appointment.departmentId
    ? appointment.departmentId.name
    : 'Unknown Department';

  // Get doctor ID as string for the link
  const doctorIdString = typeof appointment.doctorId === 'object' && appointment.doctorId
    ? (appointment.doctorId._id?.toString() || appointment.doctorId.id?.toString() || '')
    : (appointment.doctorId?.toString() || '');

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {appointment.patient.name}
              </h3>
              <p className="text-sm text-black">
                {appointment.patient.age} years, {appointment.patient.gender}
              </p>
            </div>
            <StatusBadge status={appointment.status} />
          </div>

          {/* Appointment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-black">Doctor:</span>
              <span className="ml-2 font-medium text-black">{doctorName}</span>
            </div>
            <div>
              <span className="text-black">Department:</span>
              <span className="ml-2 font-medium text-black">{departmentName}</span>
            </div>
            <div>
              <span className="text-black">Date:</span>
              <span className="ml-2 font-medium text-black">
                {formatDateDisplay(appointment.date)}
              </span>
            </div>
            <div>
              <span className="text-black">Time:</span>
              <span className="ml-2 font-medium text-black">
                {formatTimeSlot(appointment.timeSlot)}
              </span>
            </div>
            <div>
              <span className="text-black">Phone:</span>
              <span className="ml-2 font-medium text-black">
                {appointment.patient.phone}
              </span>
            </div>
            <div>
              <span className="text-black">Email:</span>
              <span className="ml-2 font-medium text-black">
                {appointment.patient.email}
              </span>
            </div>
          </div>

          {/* Reason */}
          <div className="pt-2 border-t border-gray-200">
            <p className="text-sm text-black">
              <span className="font-medium">Reason:</span> {appointment.patient.reason}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:min-w-[120px]">
          {doctorIdString && (
            <Link href={`/calendar/${doctorIdString}`}>
              <Button variant="outline" size="sm" className="w-full">
                View Calendar
              </Button>
            </Link>
          )}
          {appointment._id && (
            <Link href={`/appointments/${appointment._id}`}>
              <Button variant="primary" size="sm" className="w-full">
                View Details
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}


