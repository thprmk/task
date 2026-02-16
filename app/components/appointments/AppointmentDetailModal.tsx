'use client';

import { Appointment, AppointmentStatus } from '../../../lib/types/appointment.types';
import { Modal, StatusBadge } from '../ui';
import Button from '../ui/Button';
import { formatDateDisplay, formatTimeSlot } from '../../lib/utils/dateUtils';

type PopulatedRef = { name?: string; _id?: { toString(): string }; id?: { toString(): string } };

interface AppointmentDetailModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: AppointmentStatus) => Promise<void>;
  updating: boolean;
}

export default function AppointmentDetailModal({
  appointment,
  isOpen,
  onClose,
  onStatusUpdate,
  updating,
}: AppointmentDetailModalProps) {
  if (!appointment) return null;

  const doctorRef = appointment.doctorId as PopulatedRef | string;
  const departmentRef = appointment.departmentId as PopulatedRef | string;
  const doctorName =
    typeof doctorRef === 'object' && doctorRef && 'name' in doctorRef ? doctorRef.name : 'Unknown Doctor';
  const departmentName =
    typeof departmentRef === 'object' && departmentRef && 'name' in departmentRef
      ? departmentRef.name
      : 'Unknown Department';

  const handleStatus = (status: AppointmentStatus) => {
    if (appointment._id) onStatusUpdate(appointment._id, status);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Appointment Details" size="lg">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{appointment.patient.name}</h3>
          <StatusBadge status={appointment.status} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Doctor:</span>
            <span className="ml-2 font-medium">{doctorName}</span>
          </div>
          <div>
            <span className="text-gray-600">Department:</span>
            <span className="ml-2 font-medium">{departmentName}</span>
          </div>
          <div>
            <span className="text-gray-600">Date:</span>
            <span className="ml-2 font-medium">{formatDateDisplay(appointment.date)}</span>
          </div>
          <div>
            <span className="text-gray-600">Time:</span>
            <span className="ml-2 font-medium">{formatTimeSlot(appointment.timeSlot)}</span>
          </div>
          <div>
            <span className="text-gray-600">Phone:</span>
            <span className="ml-2 font-medium">{appointment.patient.phone}</span>
          </div>
          <div>
            <span className="text-gray-600">Email:</span>
            <span className="ml-2 font-medium">{appointment.patient.email}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-200">
          <span className="text-gray-600 block text-sm mb-1">Reason for visit:</span>
          <p className="text-gray-900">{appointment.patient.reason}</p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-3">Update status</p>
          <div className="flex flex-wrap gap-2">
            {appointment.status !== AppointmentStatus.CONFIRMED && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleStatus(AppointmentStatus.CONFIRMED)}
                disabled={updating}
              >
                Confirm
              </Button>
            )}
            {appointment.status !== AppointmentStatus.COMPLETED && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleStatus(AppointmentStatus.COMPLETED)}
                disabled={updating}
              >
                Complete
              </Button>
            )}
            {appointment.status !== AppointmentStatus.CANCELLED && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleStatus(AppointmentStatus.CANCELLED)}
                disabled={updating}
              >
                Cancel
              </Button>
            )}
            {appointment.status !== AppointmentStatus.NO_SHOW && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatus(AppointmentStatus.NO_SHOW)}
                disabled={updating}
              >
                No Show
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
