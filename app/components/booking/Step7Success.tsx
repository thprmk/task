'use client';

import { useBookingStore } from '../../lib/stores/bookingStore';
import { formatDateDisplay, formatTimeSlot } from '../../lib/utils/dateUtils';
import Button from '../ui/Button';

export default function Step7Success() {
  const {
    selectedDepartment,
    selectedDoctor,
    selectedDate,
    selectedSlot,
    patientDetails,
    reset,
  } = useBookingStore();

  const handleNewBooking = () => {
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto px-1">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Appointment Booked Successfully!</h2>
        <p className="text-sm text-gray-500 mt-0.5">Your appointment has been confirmed. You will receive a confirmation email shortly.</p>
      </header>
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center border border-green-200">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-left space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Department:</span>
            <span className="font-medium">{selectedDepartment?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Doctor:</span>
            <span className="font-medium">{selectedDoctor?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">
              {selectedDate ? formatDateDisplay(selectedDate) : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">
              {selectedSlot ? formatTimeSlot(selectedSlot) : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Patient:</span>
            <span className="font-medium">{patientDetails?.name ?? '—'}</span>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="primary" size="lg" onClick={handleNewBooking}>
            Book Another Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}






