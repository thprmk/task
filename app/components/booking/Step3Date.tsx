'use client';

import { useState } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { getMinDate, formatDateForInput } from '../../lib/utils/dateUtils';
import { isDateAvailable } from '../../lib/utils/slotManager';
import { getHolidays } from '../../../lib/holidays';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function Step3Date() {
  const { selectedDoctor, selectedDate, setDate, setStep } = useBookingStore();
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    if (!dateStr) return;

    const date = new Date(dateStr);
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
    <div className="max-w-3xl mx-auto px-2 space-y-8">
      <header className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#010043] font-helonik tracking-tight">Select Date</h2>
        <p className="text-gray-500 font-medium">Choose a date for your appointment.</p>
      </header>
      <div className="space-y-6">
        <Input
          type="date"
          label="Choose a Date"
          value={selectedDate ? formatDateForInput(selectedDate) : ''}
          onChange={handleDateChange}
          min={formatDateForInput(minDate)}
          max={formatDateForInput(maxDate)}
          required
          disabled={!selectedDoctor}
          className="h-14 text-lg"
        />

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-4 rounded-xl font-medium border border-red-100 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </p>
        )}

        {selectedDate && (
          <div className="p-4 bg-[#F05137]/5 rounded-xl border border-[#F05137]/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F05137]/10 flex items-center justify-center text-[#F05137]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Selected Date</p>
              <p className="text-gray-900 font-bold text-lg">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        )}

        {selectedDoctor && (
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900 block mb-1">Doctor's Schedule Note:</span>
              This doctor is off on{' '}
              {selectedDoctor.weeklyOff.length > 0
                ? <span className="font-medium text-[#F05137]">{selectedDoctor.weeklyOff
                  .map((day) => {
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    return days[day];
                  })
                  .join(', ')}</span>
                : 'no days'}.
            </p>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-full h-12 px-6"
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!selectedDate}
            className="min-w-[160px] h-12 text-base font-bold shadow-lg shadow-[#F05137]/20 rounded-full"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}

