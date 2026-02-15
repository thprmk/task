'use client';

import { useEffect, useState } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { Doctor } from '../../../lib/types/doctor.types';
import { Select, Card } from '../ui';
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
    <Card title="Step 2: Select Doctor" className="max-w-2xl mx-auto">
      <div className="space-y-4">
        <Select
          label="Choose a Doctor"
          options={options}
          placeholder="Select a doctor"
          value={selectedDoctor?._id || ''}
          onChange={(e) => {
            const doctor = doctors.find((d) => d._id === e.target.value);
            setDoctor(doctor || null);
          }}
          required
          disabled={loading || !selectedDepartment}
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {selectedDoctor && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Specialization:</p>
            <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
            <p className="text-sm font-medium text-gray-700 mt-2">Working Hours:</p>
            <p className="text-sm text-gray-600">
              {selectedDoctor.workingHours.start} - {selectedDoctor.workingHours.end}
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
            disabled={!selectedDoctor || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}






