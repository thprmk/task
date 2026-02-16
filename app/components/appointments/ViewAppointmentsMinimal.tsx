'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Appointment,
  AppointmentFilters,
  AppointmentStatus,
  SortOption,
} from '../../../lib/types/appointment.types';
import { Department } from '../../../lib/types/doctor.types';
import { Doctor } from '../../../lib/types/doctor.types';
import { formatDateForInput } from '../../lib/utils/dateUtils';
import { useAppointmentStore } from '../../lib/stores/appointmentStore';
import AppointmentCard from './AppointmentCard';
import AppointmentSorter from './AppointmentSorter';
import AppointmentSearch from './AppointmentSearch';
import { SelectField } from '../ui/Select';
import Input from '../ui/Input';
import { Filter, Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';

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
  const [sortBy, setSortBy] = useState<SortOption>('upcoming');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AppointmentFilters>({});
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true); // Toggle for mobile potentially, or just always show for now

  const { appointments, setAppointments, updateAppointment, bumpAppointmentInvalidation } =
    useAppointmentStore();

  const dateFrom = selectedDate || undefined;
  const dateTo = selectedDate || undefined;

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      // Use local calendar date (YYYY-MM-DD) so the selected day matches the API query
      if (dateFrom) params.append('dateFrom', formatDateForInput(new Date(dateFrom)));
      if (dateTo) params.append('dateTo', formatDateForInput(new Date(dateTo)));
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

  const handleTimeChange = (v: string) => {
    setSelectedTime(v);
  };

  const handleApply = () => {
    fetchAppointments();
  };

  useEffect(() => {
    if (selectedDate) fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch('/api/departments')
      .then((r) => r.json())
      .then((d) => d.success && setDepartments(d.data || []))
      .catch(() => { });
  }, []);

  useEffect(() => {
    if (filters.departmentId) {
      fetch(`/api/doctors?departmentId=${filters.departmentId}`)
        .then((r) => r.json())
        .then((d) => d.success && setDoctors(d.data || []))
        .catch(() => { });
    } else {
      setDoctors([]);
    }
  }, [filters.departmentId]);

  const handleStatusUpdate = async (id: string, status: AppointmentStatus) => {
    try {
      setUpdatingId(id);
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        updateAppointment(id, { status });
        bumpAppointmentInvalidation();
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleFiltersChange = (newFilters: Partial<AppointmentFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const displayDate = selectedDate ? formatDateForInput(selectedDate) : '';

  const ALL_VALUE = '__all__';
  const departmentOptions = [
    { value: ALL_VALUE, label: 'All Departments' },
    ...departments.map((d) => ({ value: d._id || '', label: d.name })),
  ].filter((o) => o.value !== '');
  const doctorOptions = [
    { value: ALL_VALUE, label: 'All Doctors' },
    ...doctors.map((d) => ({ value: d._id || '', label: `${d.name} - ${d.specialization}` })),
  ].filter((o) => o.value !== '');
  const statusOptions = [
    { value: ALL_VALUE, label: 'All Statuses' },
    { value: AppointmentStatus.PENDING, label: 'Pending' },
    { value: AppointmentStatus.CONFIRMED, label: 'Confirmed' },
    { value: AppointmentStatus.COMPLETED, label: 'Completed' },
    { value: AppointmentStatus.CANCELLED, label: 'Cancelled' },
    { value: AppointmentStatus.NO_SHOW, label: 'No Show' },
  ];

  const timeOptions = TIME_SLOT_OPTIONS.map(opt => ({ value: opt, label: opt }));

  return (
    <div className="space-y-6">
      {/* Search & Sort & Filter Toggle */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="w-full lg:w-96">
          <AppointmentSearch onSearchChange={setSearch} />
        </div>
        <div className="flex w-full lg:w-auto gap-3">
          <AppointmentSorter sortBy={sortBy} onSortChange={setSortBy} />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${showFilters
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
          >
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm transition-all animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <Input
                type="date"
                label="Date"
                value={displayDate}
                onChange={handleDateChange}
                className="w-full"
              />
            </div>
            <div>
              <SelectField
                label="Time"
                options={timeOptions}
                value={selectedTime}
                onValueChange={handleTimeChange}
              />
            </div>
            <div>
              <SelectField
                label="Department"
                options={departmentOptions}
                value={filters.departmentId || ALL_VALUE}
                onValueChange={(v) =>
                  handleFiltersChange({
                    departmentId: v === ALL_VALUE ? undefined : v,
                    doctorId: undefined,
                  })
                }
                placeholder="All Departments"
              />
            </div>
            <div>
              <SelectField
                label="Doctor"
                options={doctorOptions}
                value={filters.doctorId || ALL_VALUE}
                onValueChange={(v) =>
                  handleFiltersChange({ doctorId: v === ALL_VALUE ? undefined : v })
                }
                placeholder="All Doctors"
                disabled={!filters.departmentId}
              />
            </div>
            <div>
              <SelectField
                label="Status"
                options={statusOptions}
                value={filters.status?.[0] ?? ALL_VALUE}
                onValueChange={(v) =>
                  handleFiltersChange({
                    status: v === ALL_VALUE ? undefined : ([v] as AppointmentStatus[]),
                  })
                }
                placeholder="All Statuses"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleApply}
              className="bg-[#F05137] hover:bg-[#d94830] text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 h-64 animate-pulse p-4">
              <div className="flex justify-between mb-4">
                <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
              </div>
              <div className="h-4 w-3/4 bg-gray-100 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-100 rounded mb-6"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-100 rounded"></div>
                <div className="h-3 w-full bg-gray-100 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 rounded-xl border border-red-100 p-8 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-3" />
          <p className="text-red-700 font-medium mb-2">{error}</p>
          <button
            type="button"
            onClick={fetchAppointments}
            className="text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="mx-auto h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <CalendarIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments found</h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          {(filters.departmentId || filters.doctorId || search || selectedTime !== 'All times') && (
            <button
              onClick={() => {
                setFilters({});
                setSearch('');
                setSelectedTime('All times');
                // optional: reset date to today or keep it? Keeping it is usually better UX
                fetchAppointments();
              }}
              className="mt-4 text-[#F05137] font-medium text-sm hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-500 px-1">
            <p>
              Showing <span className="font-semibold text-gray-900">{appointments.length}</span> appointment{appointments.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {appointments.map((apt) => (
              <AppointmentCard
                key={apt._id}
                appointment={apt}
                onStatusUpdate={handleStatusUpdate}
                isUpdating={updatingId === apt._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
