'use client';

import { useState } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { formatDateDisplay, formatTimeSlot } from '../../lib/utils/dateUtils';
import { Card } from '../ui';
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

  const handleConfirm = async () => {
    if (!selectedDepartment || !selectedDoctor || !selectedDate || !selectedSlot || !patientDetails.name) {
      setError('Please complete all steps');
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
          date: selectedDate.toISOString(),
          timeSlot: selectedSlot,
          patient: patientDetails,
        }),
      });

      const data = await response.json();

      if (data.success) {
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
    <Card title="Step 6: Confirm Appointment" className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Appointment Details</h3>
            <div className="space-y-2 text-sm">
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
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{patientDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium">{patientDetails.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium">{patientDetails.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{patientDetails.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{patientDetails.email}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <span className="text-gray-600 block mb-1">Reason for Visit:</span>
                <span className="font-medium">{patientDetails.reason}</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-between gap-3">
          <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            isLoading={isSubmitting}
          >
            Confirm Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
}






