'use client';

import { useState, useEffect } from 'react';
import Input from '../ui/Input';

interface AppointmentSearchProps {
  onSearchChange: (search: string) => void;
  debounceMs?: number;
  label?: string | null;
  className?: string;
}

export default function AppointmentSearch({
  onSearchChange,
  debounceMs = 300,
  label = "Search",
  className,
}: AppointmentSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, onSearchChange]);

  return (
    <Input
      type="text"
      label={label === null ? undefined : label}
      placeholder="Search by patient name, phone, or email..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={className ?? "w-full"}
    />
  );
}




