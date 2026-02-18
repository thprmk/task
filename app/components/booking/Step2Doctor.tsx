'use client';

import { useEffect, useState } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { Doctor } from '../../../lib/types/doctor.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import Button from '../ui/Button';

export default function Step2Doctor() {
  const { selectedDepartment, selectedDoctor, setDoctor, setStep } = useBookingStore();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDepartment?._id) {
      fetchDoctors();
    }
  }, [selectedDepartment]);

  const fetchDoctors = async () => {
    if (!selectedDepartment?._id) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/doctors?departmentId=${selectedDepartment._id}`);
      const data = await response.json();

      if (data.success) {
        setDoctors(data.data);
      } else {
        setError('Failed to load doctors');
      }
    } catch (err) {
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedDoctor) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const isEmpty = doctors.length === 0 && !loading && !error;

  return (
    <div className="max-w-3xl mx-auto px-2 space-y-8">
      <header className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#010043] font-helonik tracking-tight">Select Doctor</h2>
        <p className="text-gray-500 font-medium">Choose a specialist from {selectedDepartment?.name}.</p>
      </header>

      <div className="space-y-4">
        {isEmpty ? (
          <div className="py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 mb-4 font-medium">No doctors available in this department.</p>
            <Button variant="outline" onClick={() => setStep(1)} className="font-bold">
              Change Department
            </Button>
          </div>
        ) : (
          <div className="pt-2">
            <Select
              value={selectedDoctor?._id || ""}
              onValueChange={(value) => {
                const doc = doctors.find((d) => d._id === value);
                if (doc) setDoctor(doc);
              }}
            >
              <SelectTrigger className="w-full h-14 text-lg bg-gray-50 border-gray-200 focus:ring-[#F05137]/20 focus:border-[#F05137] rounded-xl transition-all duration-200">
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                {doctors.map((doc) => {
                  if (doc._id == null) return null;
                  return (
                    <SelectItem key={doc._id} value={doc._id} className="py-4 cursor-pointer focus:bg-[#FFF5F2] focus:text-[#F05137]">
                      <div className="flex flex-col items-start gap-1.5">
                        <span className="font-bold text-base">{doc.name}</span>
                        {doc.specialization && (
                          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{doc.specialization}</span>
                        )}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

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
          disabled={!selectedDoctor}
          className="min-w-[160px] h-12 text-base font-bold shadow-lg shadow-[#F05137]/20 rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}