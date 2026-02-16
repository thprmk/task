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
    <div className="max-w-2xl mx-auto px-1">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Select Time Slot</h2>
        <p className="text-sm text-gray-500 mt-0.5">Choose an available time for your appointment</p>
      </header>
      <div className="space-y-3">
        {loading && (
          <div className="text-center py-6">
            <p className="text-gray-600">Loading available slots...</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-100">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && slotData && (
          <>
            {slotData.slots.length === 0 ? (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-sm text-amber-800">
                  No available slots for this date. Please select another date.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-3">Available time slots for {slotData.doctor.name}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {slotData.slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleSlotSelect(slot)}
                      className={`
                        px-3 py-2.5 rounded-lg border-2 transition-all text-sm font-medium
                        ${
                          selectedSlot === slot
                            ? 'border-[#F05137] bg-[#F05137]/10 text-[#F05137]'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-[#F05137]/50 hover:bg-[#F05137]/5'
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
          <div className="mt-3 p-3 bg-[#F05137]/5 rounded-lg border border-[#F05137]/20">
            <p className="text-sm text-gray-700">
              Selected slot: <span className="font-medium">{formatTimeSlot(selectedSlot)}</span>
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
            disabled={!selectedSlot || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}






