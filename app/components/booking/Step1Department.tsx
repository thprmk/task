'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { Department } from '../../../lib/types/doctor.types';
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
      setError(null);
      const response = await fetch('/api/departments');
      const data = await response.json();
      if (data.success) {
        setDepartments(data.data);
      } else {
        setError('Failed to load departments');
      }
    } catch {
      setError('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedDepartment) setStep(2);
  };

  if (loading) {
    return (
      <div className="py-6">
        <p className="text-sm text-gray-500 mb-4">Select a department</p>
        <div className="grid gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 rounded-xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <p className="text-sm text-red-600 mb-4">{error}</p>
        <button
          type="button"
          onClick={fetchDepartments}
          className="text-sm font-medium text-[#F05137] hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="py-2">
      <p className="text-sm text-gray-500 mb-4">Choose one department</p>
      <div className="grid gap-3">
        {departments.map((dept) => {
          const isSelected = selectedDepartment?._id === dept._id;
          return (
            <motion.button
              key={dept._id}
              type="button"
              onClick={() => setDepartment(dept)}
              className="w-full text-left rounded-xl border-2 bg-white px-4 py-3.5 transition-colors"
              style={{
                borderColor: isSelected ? '#F05137' : '#E5E7EB',
                backgroundColor: isSelected ? 'rgba(240, 81, 55, 0.06)' : undefined,
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.15 }}
            >
              <span
                className="font-medium text-gray-900"
                style={{ color: isSelected ? '#F05137' : undefined }}
              >
                {dept.name}
              </span>
              {dept.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {dept.description}
                </p>
              )}
            </motion.button>
          );
        })}
      </div>
      {departments.length === 0 && (
        <p className="text-sm text-gray-500 py-4">No departments available.</p>
      )}
      <div className="flex justify-end mt-6">
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!selectedDepartment}
          className="min-w-[100px]"
          style={
            selectedDepartment
              ? { backgroundColor: '#F05137', borderColor: '#F05137' }
              : undefined
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
