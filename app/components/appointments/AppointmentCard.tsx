import {
  Calendar,
  Mail,
  Phone,
  User,
  Stethoscope,
  Briefcase,
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

  const canUpdate =
    onStatusUpdate &&
    appointment._id &&
    (appointment.status === AppointmentStatus.PENDING || appointment.status === AppointmentStatus.CONFIRMED);

  return (
    <Card className="flex flex-col h-full bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden hover:border-slate-300 transition-colors min-w-0">
      {/* Header: patient + status */}
      <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-2.5 sm:pb-3 flex items-center justify-between gap-2 sm:gap-3 border-b border-slate-100 min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
            <User size={16} strokeWidth={2} className="text-slate-500" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-slate-900 truncate">
              {appointment.patient.name}
            </h3>
            <p className="text-xs text-slate-500">
              {appointment.patient.age} yrs · {appointment.patient.gender}
            </p>
          </div>
        </div>
        <StatusBadge status={appointment.status} className="shrink-0" />
      </div>

      {/* Details: compact list, wrap on small screens */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex-1 space-y-2 sm:space-y-2.5 text-xs min-w-0">
        <div className="flex items-center gap-2 text-slate-700 min-w-0">
          <Stethoscope size={12} className="shrink-0 text-slate-400" />
          <span className="truncate">{doctorName}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 min-w-0">
          <Briefcase size={12} className="shrink-0 text-slate-400" />
          <span className="truncate">{departmentName}</span>
        </div>
        <div className="flex items-start gap-2 text-slate-700 min-w-0">
          <Calendar size={12} className="shrink-0 text-slate-400 mt-0.5" />
          <span className="break-words">
            {formatDateDisplay(appointment.date)}
            <span className="hidden sm:inline"> · </span>
            <span className="sm:inline block sm:inline">{formatTimeSlot(appointment.timeSlot)}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 min-w-0">
          <Phone size={12} className="shrink-0 text-slate-400" />
          <span className="truncate">{appointment.patient.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 min-w-0">
          <Mail size={12} className="shrink-0 text-slate-400" />
          <span className="truncate break-all" title={appointment.patient.email}>{appointment.patient.email}</span>
        </div>
      </div>

      {/* Reason */}
      <div className="px-3 sm:px-4 pb-2.5 sm:pb-3 min-w-0">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Reason for visit</p>
        <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed bg-slate-50 rounded-md px-2.5 py-2 border border-slate-100 break-words">
          {appointment.patient.reason}
        </p>
      </div>

      {/* Actions: touch-friendly on mobile (min 44px) */}
      {canUpdate && (
        <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-slate-100 bg-slate-50/30 space-y-2">
          <div className="flex flex-wrap gap-2">
            {appointment.status === AppointmentStatus.PENDING && (
              <Button
                variant="primary"
                size="sm"
                className="rounded-md text-xs min-h-[44px] sm:min-h-8 flex-1 sm:flex-initial touch-manipulation"
                onClick={() => onStatusUpdate!(appointment._id!, AppointmentStatus.CONFIRMED)}
                disabled={isUpdating}
              >
                Confirm
              </Button>
            )}
            {appointment.status === AppointmentStatus.CONFIRMED && (
              <Button
                variant="secondary"
                size="sm"
                className="rounded-md text-xs min-h-[44px] sm:min-h-8 flex-1 sm:flex-initial touch-manipulation"
                onClick={() => onStatusUpdate!(appointment._id!, AppointmentStatus.COMPLETED)}
                disabled={isUpdating}
              >
                Complete
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="rounded-md text-xs min-h-[44px] sm:min-h-8 flex-1 sm:flex-initial text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 touch-manipulation"
              onClick={() => onStatusUpdate!(appointment._id!, AppointmentStatus.CANCELLED)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => onStatusUpdate!(appointment._id!, AppointmentStatus.NO_SHOW)}
              disabled={isUpdating}
              className="min-h-[44px] sm:min-h-0 py-2 sm:py-0 text-[11px] text-slate-400 hover:text-slate-600 touch-manipulation"
            >
              Mark as No Show
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}


