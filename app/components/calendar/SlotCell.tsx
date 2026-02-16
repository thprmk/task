'use client';

import { AppointmentStatus } from '../../../lib/types/appointment.types';
import { formatTimeSlot } from '../../lib/utils/dateUtils';

interface SlotCellProps {
  slot: string;
  status?: AppointmentStatus;
  appointmentId?: string;
  patientName?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function SlotCell({
  slot,
  status,
  appointmentId,
  patientName,
  onClick,
  isSelected = false,
}: SlotCellProps) {
  const getStatusColor = () => {
    if (!status) return 'bg-green-50 border-green-300 text-green-800';
    switch (status) {
      case AppointmentStatus.AVAILABLE:
        return 'bg-green-50 border-green-300 text-green-800';
      case AppointmentStatus.PENDING:
        return 'bg-amber-50 border-amber-300 text-amber-900';
      case AppointmentStatus.CONFIRMED:
        return 'bg-blue-50 border-blue-300 text-blue-800';
      case AppointmentStatus.COMPLETED:
        return 'bg-gray-100 border-gray-300 text-gray-700';
      case AppointmentStatus.CANCELLED:
        return 'bg-red-50 border-red-300 text-red-800';
      case AppointmentStatus.NO_SHOW:
        return 'bg-orange-50 border-orange-300 text-orange-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getLabel = () => {
    if (!status) return 'AVAILABLE';
    if (patientName) {
      const statusLabel =
        status === AppointmentStatus.PENDING
          ? 'Pending'
          : status === AppointmentStatus.CONFIRMED
            ? 'Confirmed'
            : status === AppointmentStatus.COMPLETED
              ? 'Completed'
              : status === AppointmentStatus.CANCELLED
                ? 'Cancelled'
                : status === AppointmentStatus.NO_SHOW
                  ? 'No Show'
                  : status;
      return `${patientName} - ${statusLabel}`;
    }
    switch (status) {
      case AppointmentStatus.PENDING:
        return 'Pending';
      case AppointmentStatus.CONFIRMED:
        return 'Confirmed';
      case AppointmentStatus.COMPLETED:
        return 'Completed';
      case AppointmentStatus.CANCELLED:
        return 'Cancelled';
      case AppointmentStatus.NO_SHOW:
        return 'No Show';
      default:
        return status;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full text-left p-2 rounded-md border transition-all duration-200 min-h-[56px]
        sm:p-2.5 sm:rounded-lg sm:min-h-[68px]
        ${getStatusColor()}
        ${isSelected ? 'ring-2 ring-[#F05137] ring-offset-1 ring-offset-white sm:ring-offset-2' : ''}
        hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05137]/50
        touch-manipulation active:scale-[0.98]
      `}
    >
      <div className="text-[11px] font-semibold text-current/90 mb-0.5 sm:text-xs">
        {formatTimeSlot(slot)}
      </div>
      <div className="text-[10px] font-medium leading-tight truncate opacity-95 sm:text-[11px]" title={getLabel()}>
        {getLabel()}
      </div>
    </button>
  );
}






