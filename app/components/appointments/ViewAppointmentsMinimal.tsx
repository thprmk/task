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
import { Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { Button } from '../ui';

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
    <div className="space-y-4 sm:space-y-6 min-w-0">
      {/* Filter bar - responsive: stack on mobile, row on xl */}
      <div className="rounded-lg border border-slate-200/80 bg-white shadow-md overflow-hidden sm:rounded-xl min-w-0">
        <div className="p-3 sm:p-4 md:p-5 flex flex-col xl:flex-row gap-3 sm:gap-4 items-stretch xl:items-end min-w-0">
          <div className="w-full xl:w-72 flex-shrink-0 min-w-0">
            <AppointmentSearch onSearchChange={setSearch} label={null} className="w-full min-w-0" />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full min-w-0">
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
              className="bg-white min-w-0"
            />
            <SelectField
              label="Doctor"
              options={doctorOptions}
              value={filters.doctorId || ALL_VALUE}
              onValueChange={(v) =>
                handleFiltersChange({ doctorId: v === ALL_VALUE ? undefined : v })
              }
              placeholder="All Doctors"
              disabled={!filters.departmentId}
              className="bg-white min-w-0"
            />
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
              className="bg-white min-w-0"
            />
            <Input
              type="date"
              label="Date"
              value={displayDate}
              onChange={handleDateChange}
              className="w-full min-h-11 sm:min-h-10 rounded-lg border-slate-200 focus:border-[#F05137] focus:ring-[#F05137]/20 bg-white text-slate-900 text-base"
            />
            <AppointmentSorter
              sortBy={sortBy}
              onSortChange={setSortBy}
              label="Sort"
              className="w-full bg-white min-w-0"
            />
          </div>
          <div className="w-full xl:w-auto xl:shrink-0">
            <Button variant="primary" size="sm" onClick={handleApply} className="rounded-lg w-full xl:min-w-[100px] min-h-11 sm:min-h-9 touch-manipulation">
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* Results - card wrapper, responsive padding and grid */}
      <div className="rounded-lg border border-slate-200/80 bg-white shadow-md overflow-hidden sm:rounded-xl min-w-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
            <div className="w-10 h-10 border-2 border-[#F05137] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-slate-600 font-medium text-sm sm:text-base">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="p-6 sm:p-8 md:p-12 text-center border-b border-slate-100">
            <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-3" />
            <p className="text-slate-700 font-medium mb-2 text-sm sm:text-base break-words">{error}</p>
            <button
              type="button"
              onClick={fetchAppointments}
              className="min-h-[44px] px-4 text-sm text-[#F05137] hover:text-[#F05137]/80 font-medium underline touch-manipulation"
            >
              Try again
            </button>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-6 sm:p-8 md:p-12 text-center">
            <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <CalendarIcon className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-1">No appointments found</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xs mx-auto">
              Try adjusting your filters or search terms.
            </p>
            {(filters.departmentId || filters.doctorId || search || selectedTime !== 'All times') && (
              <button
                type="button"
                onClick={() => {
                  setFilters({});
                  setSearch('');
                  setSelectedTime('All times');
                  fetchAppointments();
                }}
                className="mt-4 min-h-[44px] px-3 text-[#F05137] font-medium text-sm hover:underline touch-manipulation"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="px-3 sm:px-4 md:px-5 py-2.5 border-b border-slate-100">
              <p className="text-xs text-slate-500">
                <span className="font-medium text-slate-700">{appointments.length}</span> appointment{appointments.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="p-3 sm:p-4 md:p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 min-w-0">
              {appointments.map((apt) => (
                <AppointmentCard
                  key={apt._id}
                  appointment={apt}
                  onStatusUpdate={handleStatusUpdate}
                  isUpdating={updatingId === apt._id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
