'use client';

import { useEffect, useState } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { formatTimeSlot } from '../../lib/utils/dateUtils';
import { Card } from '../ui';
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
    <Card title="Step 4: Select Time Slot" className="max-w-2xl mx-auto">
      <div className="space-y-4">
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading available slots...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && slotData && (
          <>
            {slotData.slots.length === 0 ? (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  No available slots for this date. Please select another date.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Available time slots for {slotData.doctor.name}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {slotData.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelect(slot)}
                      className={`
                        px-4 py-3 rounded-lg border-2 transition-all
                        ${
                          selectedSlot === slot
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50'
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
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              Selected slot: <span className="font-medium">{formatTimeSlot(selectedSlot)}</span>
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
            disabled={!selectedSlot || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}






