'use client';

import { useState } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { Doctor } from '../../../lib/types/doctor.types';
import { getMinDate, formatDateForInput } from '../../lib/utils/dateUtils';
import { isDateAvailable } from '../../lib/utils/slotManager';
import { Card } from '../ui';
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

    // Check if date is available
    const slotConfig = {
      slotDuration: 30,
      workingHours: selectedDoctor.workingHours,
      breakTime: selectedDoctor.breakTime,
      weeklyOff: selectedDoctor.weeklyOff,
      holidays: [],
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
    <Card title="Step 3: Select Date" className="max-w-2xl mx-auto">
      <div className="space-y-4">
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
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              Selected date: <span className="font-medium">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </p>
          </div>
        )}

        {selectedDoctor && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
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

        <div className="flex justify-between gap-3 mt-6">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!selectedDate}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}

