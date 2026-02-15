'use client';

import { useBookingStore } from '../../lib/stores/bookingStore';
import { formatDateDisplay, formatTimeSlot } from '../../lib/utils/dateUtils';
import { Card } from '../ui';
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
    <Card className="max-w-2xl mx-auto">
      <div className="text-center space-y-6 py-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
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

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Appointment Booked Successfully!
          </h2>
          <p className="text-gray-600">
            Your appointment has been confirmed. You will receive a confirmation email shortly.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg text-left space-y-3">
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
            <span className="font-medium">{patientDetails.name}</span>
          </div>
        </div>

        <div className="pt-4">
          <Button variant="primary" onClick={handleNewBooking}>
            Book Another Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
}






