'use client';

import { useState, useMemo, useEffect } from 'react';
import { Appointment, AppointmentFilters, SortOption } from '../../../lib/types/appointment.types';
import AppointmentCard from './AppointmentCard';
import AppointmentSorter from './AppointmentSorter';
import AppointmentSearch from './AppointmentSearch';
import AppointmentFiltersFull from './AppointmentFilters';

interface ViewAppointmentsMinimalProps {
  initialDate?: Date | null;
  initialTime?: string | null;
}

const TIME_SLOT_OPTIONS = [
  'All times',
  '06:00-06:30',
  '06:30-07:00',
  '07:00-07:30',
  '07:30-08:00',
  '08:00-08:30',
  '08:30-09:00',
  '09:00-09:30',
  '09:30-10:00',
  '10:00-10:30',
  '10:30-11:00',
  '11:00-11:30',
  '11:30-12:00',
  '12:00-12:30',
  '12:30-13:00',
  '13:00-13:30',
  '13:30-14:00',
  '14:00-14:30',
  '14:30-15:00',
  '15:00-15:30',
  '15:30-16:00',
  '16:00-16:30',
  '16:30-17:00',
  '17:00-17:30',
  '17:30-18:00',
];

export default function ViewAppointmentsMinimal({
  initialDate = null,
  initialTime = null,
}: ViewAppointmentsMinimalProps) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate ?? today);
  const [selectedTime, setSelectedTime] = useState<string>(initialTime ?? 'All times');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('upcoming');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filters, setFilters] = useState<AppointmentFilters>({});

  const dateFrom = selectedDate || undefined;
  const dateTo = selectedDate || undefined;

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (dateFrom) params.append('dateFrom', new Date(dateFrom).toISOString().split('T')[0]);
      if (dateTo) params.append('dateTo', new Date(dateTo).toISOString().split('T')[0]);
      if (filters.departmentId) params.append('departmentId', filters.departmentId);
      if (filters.doctorId) params.append('doctorId', filters.doctorId);
      if (filters.status?.length) params.append('status', filters.status.join(','));
      if (search) params.append('search', search);
      if (sortBy) params.append('sortBy', sortBy);

      const response = await fetch(`/api/appointments?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        let list = data.data || [];
        if (selectedTime && selectedTime !== 'All times') {
          list = list.filter((a: Appointment) => a.timeSlot === selectedTime);
        }
        setAppointments(list);
      } else {
        setError(data.error || 'Failed to fetch appointments');
      }
    } catch (err) {
      setError('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSelectedDate(v ? new Date(v + 'T00:00:00') : null);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleApply = () => {
    fetchAppointments();
  };

  useEffect(() => {
    if (selectedDate) fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltersChange = (newFilters: Partial<AppointmentFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const displayDate = selectedDate
    ? selectedDate.toISOString().split('T')[0]
    : '';

  return (
    <div className="space-y-6">
      {/* Minimal: Select Date & Time first */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-500 mb-3">Select date & time</h2>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
            <input
              type="date"
              value={displayDate}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F05137]/30 focus:border-[#F05137]"
            />
          </div>
          <div className="w-full sm:w-48">
            <label className="block text-xs font-medium text-gray-600 mb-1">Time</label>
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F05137]/30 focus:border-[#F05137]"
            >
              {TIME_SLOT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 rounded-lg font-medium text-white transition-colors"
            style={{ backgroundColor: '#F05137' }}
          >
            View
          </button>
        </div>
        <button
          type="button"
          onClick={() => setShowMoreFilters((v) => !v)}
          className="mt-3 text-xs text-gray-500 hover:text-gray-700"
        >
          {showMoreFilters ? 'Hide filters' : '+ More filters (department, doctor, status)'}
        </button>
        {showMoreFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <AppointmentFiltersFull
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={() => setFilters({})}
            />
          </div>
        )}
      </div>

      {/* Search & Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <AppointmentSearch onSearchChange={setSearch} />
        </div>
        <div className="sm:w-40">
          <AppointmentSorter sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
          Loading…
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-red-600">
          {error}
          <button
            type="button"
            onClick={fetchAppointments}
            className="mt-3 text-sm underline"
          >
            Retry
          </button>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
          No appointments for this date{selectedTime !== 'All times' ? ' and time' : ''}.
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{appointments.length}</span> appointment
            {appointments.length !== 1 ? 's' : ''}
          </p>
          {appointments.map((apt) => (
            <AppointmentCard key={apt._id} appointment={apt} />
          ))}
        </div>
      )}
    </div>
  );
}
