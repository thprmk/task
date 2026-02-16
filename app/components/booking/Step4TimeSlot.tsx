'use client';

import { useEffect, useState } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { formatTimeSlot } from '../../lib/utils/dateUtils';
import Button from '../ui/Button';

interface SlotData {
  slots: string[];
  doctor: {
    name: string;
    workingHours: { start: string; end: string };
  };
}

export default function Step4TimeSlot() {
  const { selectedDoctor, selectedDate, selectedSlot, setSlot, setStep } = useBookingStore();
  const [slotData, setSlotData] = useState<SlotData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDoctor?._id && selectedDate) {
      fetchSlots();
    }
  }, [selectedDoctor, selectedDate]);

  const fetchSlots = async () => {
    if (!selectedDoctor?._id || !selectedDate) return;

    try {
      setLoading(true);
      setError(null);
      const dateStr = selectedDate.toISOString().split('T')[0];
      const response = await fetch(`/api/slots?doctorId=${selectedDoctor._id}&date=${dateStr}`);
      const data = await response.json();

      if (data.success) {
        setSlotData(data.data);
      } else {
        setError(data.error || 'Failed to load available slots');
      }
    } catch (err) {
      setError('Failed to load available slots');
    } finally {
      setLoading(false);
    }
  };

  const handleSlotSelect = (slot: string) => {
    setSlot(slot);
  };

  const handleNext = () => {
    if (selectedSlot) {
      setStep(5);
    }
  };

  const handleBack = () => {
    setStep(3);
  };

  return (
    <div className="max-w-3xl mx-auto px-2 space-y-8">
      <header className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#010043] font-helonik tracking-tight">Select Time Slot</h2>
        <p className="text-gray-500 font-medium">Choose an available time for your appointment.</p>
      </header>
      <div className="space-y-6">
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-[#F05137] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading available slots...</p>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-4 rounded-xl font-medium border border-red-100 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </p>
        )}

        {!loading && !error && slotData && (
          <>
            {slotData.slots.length === 0 ? (
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-100 text-center">
                <p className="text-amber-800 font-medium mb-1">No slots available</p>
                <p className="text-sm text-amber-600">
                  Please go back and select another date.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Available Slots</p>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{slotData.slots.length} slots</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {slotData.slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleSlotSelect(slot)}
                      className={`
                        px-4 py-3 rounded-xl border-2 transition-all text-sm font-bold
                        ${selectedSlot === slot
                          ? 'border-[#F05137] bg-[#F05137] text-white shadow-lg shadow-[#F05137]/30 scale-105'
                          : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-[#F05137] hover:text-[#F05137] hover:bg-white'
                        }
                      `}
                    >
                      {formatTimeSlot(slot)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {selectedSlot && (
          <div className="p-4 bg-[#F05137]/5 rounded-xl border border-[#F05137]/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F05137]/10 flex items-center justify-center text-[#F05137]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Selected Time</p>
              <p className="text-gray-900 font-bold text-lg">
                {formatTimeSlot(selectedSlot)}
              </p>
            </div>
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
            disabled={!selectedSlot || loading}
            className="min-w-[160px] h-12 text-base font-bold shadow-lg shadow-[#F05137]/20 rounded-full"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}






