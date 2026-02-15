'use client';

import { AppointmentStatus } from '../../../lib/types/appointment.types';
import StatusBadge from '../ui/StatusBadge';
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
    if (!status) return 'bg-green-50 border-green-200';
    
    switch (status) {
      case AppointmentStatus.AVAILABLE:
        return 'bg-green-50 border-green-200';
      case AppointmentStatus.PENDING:
        return 'bg-yellow-50 border-yellow-200';
      case AppointmentStatus.CONFIRMED:
        return 'bg-blue-50 border-blue-200';
      case AppointmentStatus.COMPLETED:
        return 'bg-gray-50 border-gray-200';
      case AppointmentStatus.CANCELLED:
        return 'bg-red-50 border-red-200';
      case AppointmentStatus.NO_SHOW:
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-3 rounded-lg border-2 cursor-pointer transition-all
        ${getStatusColor()}
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${onClick ? 'hover:shadow-md' : ''}
      `}
    >
      <div className="text-sm font-medium text-gray-900 mb-1">
        {formatTimeSlot(slot)}
      </div>
      {status && (
        <div className="mb-1">
          <StatusBadge status={status} />
        </div>
      )}
      {patientName && (
        <div className="text-xs text-gray-600 truncate" title={patientName}>
          {patientName}
        </div>
      )}
      {appointmentId && !status && (
        <div className="text-xs text-gray-500">Available</div>
      )}
    </div>
  );
}






