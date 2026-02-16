'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { Department } from '../../../lib/types/doctor.types';
import Button from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

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
      if (!response.ok || !data.success) {
        setError(data.error || 'Unable to load departments. Please try again.');
        setDepartments([]);
        return;
      }
      setDepartments(data.data ?? []);
    } catch {
      setError('Unable to load departments. Please try again.');
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedDepartment) setStep(2);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-1 py-8 space-y-5">
        <div className="h-5 w-1/3 bg-gray-100 rounded animate-pulse" />
        <div className="h-14 w-full bg-gray-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-1 py-8 text-center">
        <p className="text-[15px] text-red-600 mb-5">{error}</p>
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

  const isEmpty = departments.length === 0;

  return (
    <div className="max-w-2xl mx-auto px-1 space-y-5">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Select Department</h2>
        <p className="text-sm text-gray-500">Choose the medical department for your appointment.</p>
      </header>
      <div className="space-y-2">

        {isEmpty ? (
          <div className="py-10 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-sm text-gray-500 mb-3">No departments available.</p>
            <button
              type="button"
              onClick={fetchDepartments}
              className="text-sm font-medium text-[#F05137] hover:underline"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="pt-2">
            <Select
              value={selectedDepartment?._id || ""}
              onValueChange={(value) => {
                const dept = departments.find((d) => d._id === value);
                if (dept) setDepartment(dept);
              }}
            >
              <SelectTrigger className="w-full [&>span]:line-clamp-none [&>span]:text-left [&>span]:whitespace-normal">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => {
                  if (dept._id == null) return null;
                  return (
                    <SelectItem key={dept._id} value={dept._id} className="py-3">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-medium">{dept.name}</span>
                        {dept.description && (
                          <span className="text-xs text-gray-500 line-clamp-1">{dept.description}</span>
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

      <div className="flex justify-end pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!selectedDepartment}
          className="min-w-[140px]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
