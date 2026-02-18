'use client';

import { SortOption } from '../../../lib/types/appointment.types';
import { SelectField } from '../ui/Select';

interface AppointmentSorterProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  label?: string | null;
  className?: string;
}

export default function AppointmentSorter({ sortBy, onSortChange, label = "Sort By", className }: AppointmentSorterProps) {
  const sortOptions = [
    { value: 'upcoming', label: 'Upcoming First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'doctor-asc', label: 'Doctor (A-Z)' },
    { value: 'doctor-desc', label: 'Doctor (Z-A)' },
    { value: 'department-asc', label: 'Department (A-Z)' },
    { value: 'department-desc', label: 'Department (Z-A)' },
  ];

  return (
    <SelectField
      label={label === null ? undefined : label}
      options={sortOptions}
      value={sortBy}
      onValueChange={(v) => onSortChange(v as SortOption)}
      placeholder="Sort by..."
      className={className ?? "w-full sm:w-auto"}
    />
  );
}
