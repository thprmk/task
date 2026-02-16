'use client';

import { useState } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { formatDateDisplay, formatDateForInput, formatTimeSlot } from '../../lib/utils/dateUtils';
import Button from '../ui/Button';

export default function Step6Confirm() {
  const {
    selectedDepartment,
    selectedDoctor,
    selectedDate,
    selectedSlot,
    patientDetails,
    setStep,
  } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasRequiredPatientDetails =
    patientDetails?.name &&
    patientDetails?.age != null &&
    patientDetails?.gender &&
    patientDetails?.phone &&
    patientDetails?.email &&
    patientDetails?.reason;

  const handleConfirm = async () => {
    if (!selectedDepartment || !selectedDoctor || !selectedDate || !selectedSlot) {
      setError('Please complete all steps (department, doctor, date, and time).');
      return;
    }
    if (!hasRequiredPatientDetails) {
      setError('Please complete patient details in Step 5 (name, age, gender, phone, email, and reason for visit).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: selectedDoctor._id,
          departmentId: selectedDepartment._id,
          date: formatDateForInput(selectedDate),
          timeSlot: selectedSlot,
          patient: patientDetails,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStep(7);
      } else {
        setError(data.error || 'Failed to book appointment');
      }
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep(5);
  };

  return (
    <div className="max-w-3xl mx-auto px-2 space-y-8">
      <header className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#010043] font-helonik tracking-tight">Confirm Appointment</h2>
        <p className="text-gray-500 font-medium">Review your details before confirming.</p>
      </header>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="font-bold text-[#010043] font-helonik text-lg border-b border-gray-200 pb-2">Appointment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center group">
                <span className="text-gray-500 text-sm font-medium">Department</span>
                <span className="font-bold text-gray-900 group-hover:text-[#F05137] transition-colors text-right">{selectedDepartment?.name}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-500 text-sm font-medium">Doctor</span>
                <span className="font-bold text-gray-900 group-hover:text-[#F05137] transition-colors text-right">{selectedDoctor?.name}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-500 text-sm font-medium">Date</span>
                <span className="font-bold text-gray-900 group-hover:text-[#F05137] transition-colors text-right">
                  {selectedDate ? formatDateDisplay(selectedDate) : ''}
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-500 text-sm font-medium">Time</span>
                <span className="font-bold text-gray-900 group-hover:text-[#F05137] transition-colors text-right">
                  {selectedSlot ? formatTimeSlot(selectedSlot) : ''}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="font-bold text-[#010043] font-helonik text-lg border-b border-gray-200 pb-2">Patient Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Name</span>
                <span className="font-semibold text-gray-900 text-right">{patientDetails?.name ?? '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Age / Gender</span>
                <span className="font-semibold text-gray-900 text-right">{patientDetails?.age} / {patientDetails?.gender}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Phone</span>
                <span className="font-semibold text-gray-900 text-right">{patientDetails?.phone ?? '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Email</span>
                <span className="font-semibold text-gray-900 break-all text-right ml-4">{patientDetails?.email ?? '—'}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 p-5 bg-white rounded-2xl border border-gray-200">
            <span className="text-gray-500 text-sm font-bold uppercase tracking-wide block mb-2">Reason for Visit</span>
            <p className="font-medium text-gray-900">{patientDetails?.reason ?? '—'}</p>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-4 rounded-xl font-medium border border-red-100 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </p>
        )}

        <div className="flex justify-between pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-full h-12 px-6"
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleConfirm}
            isLoading={isSubmitting}
            className="min-w-[200px] h-12 text-base font-bold shadow-lg shadow-[#F05137]/20 rounded-full bg-[#010043] hover:bg-[#010043]/90 text-white"
          >
            Confirm Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}






