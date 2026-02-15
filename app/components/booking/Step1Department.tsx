'use client';

import { useEffect, useState } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { Department } from '../../../lib/types/doctor.types';
import { Select, Card } from '../ui';
import Button from '../ui/Button';

export default function Step1Department() {
  const { selectedDepartment, setDepartment, setStep } = useBookingStore();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/departments');
      const data = await response.json();
      
      if (data.success) {
        setDepartments(data.data);
      } else {
        setError('Failed to load departments');
      }
    } catch (err) {
      setError('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedDepartment) {
      setStep(2);
    }
  };

  const options = departments.map((dept) => ({
    value: dept._id || '',
    label: dept.name,
  }));

  return (
    <Card title="Step 1: Select Department" className="max-w-2xl mx-auto">
      <div className="space-y-4">
        <Select
          label="Choose a Department"
          options={options}
          placeholder="Select a department"
          value={selectedDepartment?._id || ''}
          onChange={(e) => {
            const dept = departments.find((d) => d._id === e.target.value);
            setDepartment(dept || null);
          }}
          required
          disabled={loading}
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {selectedDepartment?.description && (
          <p className="text-sm text-gray-600 mt-2">
            {selectedDepartment.description}
          </p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!selectedDepartment || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}






