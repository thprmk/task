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

    <div className="max-w-3xl mx-auto px-2 space-y-8">
      <header className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#010043] font-helonik tracking-tight">Select Department</h2>
        <p className="text-gray-500 font-medium">Choose the medical department for your appointment.</p>
      </header>

      <div className="space-y-4">
        {isEmpty ? (
          <div className="py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 mb-4 font-medium">No departments available at the moment.</p>
            <button
              type="button"
              onClick={fetchDepartments}
              className="text-sm font-bold text-[#F05137] hover:underline uppercase tracking-wide"
            >
              Refresh List
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
              <SelectTrigger className="w-full h-14 text-lg bg-gray-50 border-gray-200 focus:ring-[#F05137]/20 focus:border-[#F05137] rounded-xl transition-all duration-200 [&>span]:line-clamp-none [&>span]:text-left [&>span]:whitespace-normal">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                {departments.map((dept) => {
                  if (dept._id == null) return null;
                  return (
                    <SelectItem key={dept._id} value={dept._id} className="py-4 cursor-pointer focus:bg-[#FFF5F2] focus:text-[#F05137]">
                      <div className="flex flex-col items-start gap-1.5">
                        <span className="font-bold text-base">{dept.name}</span>
                        {dept.description && (
                          <span className="text-xs text-gray-400 line-clamp-1 font-medium">{dept.description}</span>
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

      <div className="flex justify-end pt-6 border-t border-gray-100">
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!selectedDepartment}
          className="min-w-[160px] h-12 text-base font-bold shadow-lg shadow-[#F05137]/20 rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
