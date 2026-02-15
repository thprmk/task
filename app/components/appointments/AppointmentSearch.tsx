'use client';

import { useState, useEffect } from 'react';
import Input from '../ui/Input';

interface AppointmentSearchProps {
  onSearchChange: (search: string) => void;
  debounceMs?: number;
}

export default function AppointmentSearch({
  onSearchChange,
  debounceMs = 300,
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
      label="Search"
      placeholder="Search by patient name, phone, or email..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full"
    />
  );
}




