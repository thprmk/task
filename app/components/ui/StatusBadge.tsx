import React from 'react';
import { AppointmentStatus } from '../../../lib/types/appointment.types';

interface StatusBadgeProps {
  status: AppointmentStatus;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusConfig = {
    [AppointmentStatus.AVAILABLE]: {
      label: 'Available',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-300',
    },
    [AppointmentStatus.PENDING]: {
      label: 'Pending',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-300',
    },
    [AppointmentStatus.CONFIRMED]: {
      label: 'Confirmed',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-300',
    },
    [AppointmentStatus.COMPLETED]: {
      label: 'Completed',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-300',
    },
    [AppointmentStatus.CANCELLED]: {
      label: 'Cancelled',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-300',
    },
    [AppointmentStatus.NO_SHOW]: {
      label: 'No Show',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-300',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        border ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${className}
      `}
    >
      {config.label}
    </span>
  );
}






