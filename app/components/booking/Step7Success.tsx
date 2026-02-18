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
      <header className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#010043] font-helonik tracking-tight flex items-center justify-center sm:justify-start gap-3">
          Appointment Booked!
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center border border-green-200 shrink-0">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </h2>
        <p className="text-gray-500 font-medium mt-2">Your appointment has been confirmed.</p>
      </header>
      <div className="space-y-6">


        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="font-bold text-[#010043] font-helonik text-lg border-b border-gray-200 pb-2">Booking Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center group">
                <span className="text-gray-500 text-sm font-medium">Department</span>
                <span className="font-bold text-gray-900 text-right">{selectedDepartment?.name}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-500 text-sm font-medium">Doctor</span>
                <span className="font-bold text-gray-900 text-right">{selectedDoctor?.name}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-500 text-sm font-medium">Date</span>
                <span className="font-bold text-gray-900 text-right">
                  {selectedDate ? formatDateDisplay(selectedDate) : ''}
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-500 text-sm font-medium">Time</span>
                <span className="font-bold text-gray-900 text-right">
                  {selectedSlot ? formatTimeSlot(selectedSlot) : ''}
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-500 text-sm font-medium">Patient</span>
                <span className="font-bold text-gray-900 text-right">{patientDetails?.name ?? '—'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={handleNewBooking}
            className="min-w-[200px] h-12 text-base font-bold shadow-lg shadow-[#F05137]/20 rounded-full"
          >
            Book Another Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
