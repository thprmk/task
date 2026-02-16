'use client';

import { useState, useEffect } from 'react';
import { AppointmentFilters as Filters, AppointmentStatus } from '../../../lib/types/appointment.types';
import { Department } from '../../../lib/types/doctor.types';
import { Doctor } from '../../../lib/types/doctor.types';
import { Card, SelectField, Button } from '../ui';
import Input from '../ui/Input';

interface AppointmentFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Partial<Filters>) => void;
  onReset: () => void;
}

export default function AppointmentFilters({
  filters,
  onFiltersChange,
  onReset,
}: AppointmentFiltersProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (filters.departmentId) {
      fetchDoctors(filters.departmentId);
    } else {
      setDoctors([]);
    }
  }, [filters.departmentId]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      const data = await response.json();
      if (data.success) {
        setDepartments(data.data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async (departmentId: string) => {
    try {
      const response = await fetch(`/api/doctors?departmentId=${departmentId}`);
      const data = await response.json();
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const statusOptions = [
    { value: AppointmentStatus.PENDING, label: 'Pending' },
    { value: AppointmentStatus.CONFIRMED, label: 'Confirmed' },
    { value: AppointmentStatus.COMPLETED, label: 'Completed' },
    { value: AppointmentStatus.CANCELLED, label: 'Cancelled' },
    { value: AppointmentStatus.NO_SHOW, label: 'No Show' },
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    ...departments.map((dept) => ({
      value: dept._id || '',
      label: dept.name,
    })),
  ];

  const doctorOptions = [
    { value: '', label: 'All Doctors' },
    ...doctors.map((doctor) => ({
      value: doctor._id || '',
      label: `${doctor.name} - ${doctor.specialization}`,
    })),
  ];

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatuses = Array.from(e.target.selectedOptions, (option) => option.value);
    onFiltersChange({
      status: selectedStatuses.length > 0 ? (selectedStatuses as AppointmentStatus[]) : undefined,
    });
  };

  return (
    <Card title="Filters" className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Department Filter */}
        <SelectField
          label="Department"
          options={departmentOptions}
          value={filters.departmentId || ''}
          onValueChange={(v) =>
            onFiltersChange({
              departmentId: v || undefined,
              doctorId: undefined,
            })
          }
          placeholder="All Departments"
          disabled={loading}
        />

        {/* Doctor Filter */}
        <SelectField
          label="Doctor"
          options={doctorOptions}
          value={filters.doctorId || ''}
          onValueChange={(v) =>
            onFiltersChange({
              doctorId: v || undefined,
            })
          }
          placeholder="All Doctors"
          disabled={loading || !filters.departmentId}
        />

        {/* Date From */}
        <Input
          type="date"
          label="Date From"
          value={
            filters.dateFrom
              ? new Date(filters.dateFrom).toISOString().split('T')[0]
              : ''
          }
          onChange={(e) =>
            onFiltersChange({
              dateFrom: e.target.value ? new Date(e.target.value) : undefined,
            })
          }
        />

        {/* Date To */}
        <Input
          type="date"
          label="Date To"
          value={
            filters.dateTo
              ? new Date(filters.dateTo).toISOString().split('T')[0]
              : ''
          }
          onChange={(e) =>
            onFiltersChange({
              dateTo: e.target.value ? new Date(e.target.value) : undefined,
            })
          }
        />
      </div>

      {/* Status Filter */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Status (Multiple Selection)
        </label>
        <select
          multiple
          value={filters.status || []}
          onChange={handleStatusChange}
          className="flex min-h-[100px] w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F05137]/30 focus:ring-offset-0 focus:border-[#F05137] disabled:opacity-50"
          size={5}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-sm text-gray-500">
          Hold Ctrl/Cmd to select multiple statuses
        </p>
      </div>

      {/* Reset Button */}
      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </Card>
  );
}


