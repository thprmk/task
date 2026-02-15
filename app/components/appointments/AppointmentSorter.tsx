'use client';

import { SortOption } from '../../../lib/types/appointment.types';
import { Select } from '../ui';

interface AppointmentSorterProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function AppointmentSorter({ sortBy, onSortChange }: AppointmentSorterProps) {
  const sortOptions = [
    { value: 'upcoming', label: 'Upcoming First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'doctor-asc', label: 'Doctor (A-Z)' },
    { value: 'doctor-desc', label: 'Doctor (Z-A)' },
    { value: 'department-asc', label: 'Department (A-Z)' },
    { value: 'department-desc', label: 'Department (Z-A)' },
  ];

  return (
    <Select
      label="Sort By"
      options={sortOptions}
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value as SortOption)}
      className="w-full sm:w-auto"
    />
  );
}




