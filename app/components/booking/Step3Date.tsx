'use client';

import { useState } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { Doctor } from '../../../lib/types/doctor.types';
import { getMinDate, formatDateForInput } from '../../lib/utils/dateUtils';
import { isDateAvailable } from '../../lib/utils/slotManager';
import { getHolidays } from '../../../lib/holidays';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function Step3Date() {
  const { selectedDoctor, selectedDate, setDate, setStep } = useBookingStore();
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setError(null);

    if (!selectedDoctor) {
      setError('Please select a doctor first');
      return;
    }

    // Check if date is available (no past, not weekly off, not holiday)
    const slotConfig = {
      slotDuration: selectedDoctor.slotDuration ?? 30,
      workingHours: selectedDoctor.workingHours,
      breakTime: selectedDoctor.breakTime,
      weeklyOff: selectedDoctor.weeklyOff,
      holidays: getHolidays(),
    };

    if (!isDateAvailable(date, slotConfig)) {
      setError('This date is not available for booking');
      return;
    }

    setDate(date);
  };

  const handleNext = () => {
    if (selectedDate) {
      setStep(4);
    }
  };

  const handleBack = () => {
    setStep(2);
  };

  const minDate = getMinDate();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3); // Allow booking up to 3 months ahead

  return (
    <div className="max-w-2xl mx-auto px-1">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Select Date</h2>
        <p className="text-sm text-gray-500 mt-0.5">Choose a date for your appointment</p>
      </header>
      <div className="space-y-3">
        <Input
          type="date"
          label="Choose a Date"
          value={selectedDate ? formatDateForInput(selectedDate) : ''}
          onChange={handleDateChange}
          min={formatDateForInput(minDate)}
          max={formatDateForInput(maxDate)}
          required
          disabled={!selectedDoctor}
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {selectedDate && (
          <div className="mt-3 p-3 bg-[#F05137]/5 rounded-lg border border-[#F05137]/20">
            <p className="text-sm text-gray-700">
              Selected date: <span className="font-medium">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </p>
          </div>
        )}

        {selectedDoctor && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Note:</span> This doctor is off on{' '}
              {selectedDoctor.weeklyOff.length > 0
                ? selectedDoctor.weeklyOff
                    .map((day) => {
                      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                      return days[day];
                    })
                    .join(', ')
                : 'no days'}
            </p>
          </div>
        )}

        <div className="flex justify-between gap-3 mt-4">
          <Button variant="outline" size="lg" onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!selectedDate}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

