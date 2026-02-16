import {
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  MapPin,
  Stethoscope,
  Briefcase
} from 'lucide-react';
import { Appointment, AppointmentStatus } from '../../../lib/types/appointment.types';
import { formatDateDisplay, formatTimeSlot } from '../../lib/utils/dateUtils';
import { Card, StatusBadge } from '../ui';
import Button from '../ui/Button';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusUpdate?: (id: string, status: AppointmentStatus) => void;
  isUpdating?: boolean;
}

type PopulatedRef = { name?: string; _id?: { toString(): string }; id?: { toString(): string } };

export default function AppointmentCard({ appointment, onStatusUpdate, isUpdating }: AppointmentCardProps) {
  const doctorRef = appointment.doctorId as PopulatedRef | string;
  const departmentRef = appointment.departmentId as PopulatedRef | string;
  const doctorName = typeof doctorRef === 'object' && doctorRef && 'name' in doctorRef
    ? doctorRef.name
    : 'Unknown Doctor';
  const departmentName = typeof departmentRef === 'object' && departmentRef && 'name' in departmentRef
    ? departmentRef.name
    : 'Unknown Department';

  return (
    <Card className="hover:shadow-md transition-all duration-200 border-gray-200/60 flex flex-col h-full bg-white group">
      <div className="p-1 flex-1 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 leading-tight">
                {appointment.patient.name}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {appointment.patient.age} yrs • {appointment.patient.gender}
              </p>
            </div>
          </div>
          <StatusBadge status={appointment.status} className="shrink-0" />
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-1 gap-y-2.5 text-sm">
          <div className="flex items-center text-gray-600 gap-2.5">
            <Stethoscope size={16} className="text-gray-400 shrink-0" />
            <span className="font-medium text-gray-900">{doctorName}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-2.5">
            <Briefcase size={16} className="text-gray-400 shrink-0" />
            <span>{departmentName}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-2.5">
            <Calendar size={16} className="text-gray-400 shrink-0" />
            <span>{formatDateDisplay(appointment.date)}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-2.5">
            <Clock size={16} className="text-gray-400 shrink-0" />
            <span>{formatTimeSlot(appointment.timeSlot)}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-3" />

        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600 gap-2.5">
            <Phone size={14} className="text-gray-400 shrink-0" />
            <span className="truncate">{appointment.patient.phone}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-2.5">
            <Mail size={14} className="text-gray-400 shrink-0" />
            <span className="truncate" title={appointment.patient.email}>{appointment.patient.email}</span>
          </div>
        </div>

        {/* Reason */}
        <div className="bg-gray-50 rounded-lg p-3 mt-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Reason</p>
          <p className="text-sm text-gray-700 line-clamp-2">{appointment.patient.reason}</p>
        </div>
      </div>

      {/* Actions */}
      {onStatusUpdate && appointment._id && (
        <div className="pt-4 mt-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {appointment.status !== AppointmentStatus.CONFIRMED && (
              <Button
                variant="primary"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => onStatusUpdate(appointment._id!, AppointmentStatus.CONFIRMED)}
                disabled={isUpdating}
              >
                Confirm
              </Button>
            )}
            {appointment.status !== AppointmentStatus.COMPLETED && appointment.status === AppointmentStatus.CONFIRMED && (
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 text-xs bg-green-600 hover:bg-green-700 text-white border-transparent"
                onClick={() => onStatusUpdate(appointment._id!, AppointmentStatus.COMPLETED)}
                disabled={isUpdating}
              >
                Complete
              </Button>
            )}
            {(appointment.status === AppointmentStatus.PENDING || appointment.status === AppointmentStatus.CONFIRMED) && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                onClick={() => onStatusUpdate(appointment._id!, AppointmentStatus.CANCELLED)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
            )}
          </div>
          {/* Secondary Actions Row if needed, or keeping it clean */}
          {(appointment.status === AppointmentStatus.PENDING || appointment.status === AppointmentStatus.CONFIRMED) && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => onStatusUpdate(appointment._id!, AppointmentStatus.NO_SHOW)}
                disabled={isUpdating}
                className="text-xs text-gray-400 hover:text-gray-600 underline decoration-gray-300 hover:decoration-gray-500"
              >
                Mark as No Show
              </button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}


