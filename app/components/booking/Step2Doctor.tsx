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

  const options = doctors.map((doctor) => ({
    value: doctor._id || '',
    label: `${doctor.name} - ${doctor.specialization}`,
  }));

  return (
    <div className="max-w-2xl mx-auto px-1">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Select Doctor</h2>
        <p className="text-sm text-gray-500 mt-0.5">Choose a specialist for your consultation</p>
      </header>

      <div className="space-y-4">
        <Select
          value={selectedDoctor?._id || ''}
          onValueChange={(value) => {
            const doctor = doctors.find((d) => d._id === value);
            setDoctor(doctor || null);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a doctor" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} className="py-3">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        )}

        {selectedDoctor && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-2">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Specialization</p>
              <p className="text-gray-900 font-medium">{selectedDoctor.specialization}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Working Hours</p>
              <p className="text-gray-900 font-medium">
                {selectedDoctor.workingHours.start} - {selectedDoctor.workingHours.end}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between gap-3 pt-2">
          <Button variant="outline" size="lg" onClick={handleBack} className="min-w-[100px]">
            Back
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!selectedDoctor || loading}
            className="min-w-[120px]"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}






