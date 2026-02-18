'use client';

import { useState, useEffect } from 'react';
import { Appointment, AppointmentFilters, SortOption } from '../../../lib/types/appointment.types';
import AppointmentCard from './AppointmentCard';
import FiltersComponent from './AppointmentFilters';
import AppointmentSorter from './AppointmentSorter';
import AppointmentSearch from './AppointmentSearch';
import { Card, Button } from '../ui';

interface AppointmentListProps {
  initialFilters?: Partial<AppointmentFilters>;
  initialSort?: SortOption;
}

export default function AppointmentList({
  initialFilters = {},
  initialSort = 'upcoming',
}: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filters, setFilters] = useState<AppointmentFilters>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [filters, sortBy, search]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      
      if (filters.departmentId) {
        params.append('departmentId', filters.departmentId);
      }
      if (filters.doctorId) {
        params.append('doctorId', filters.doctorId);
      }
      if (filters.status && filters.status.length > 0) {
        params.append('status', filters.status.join(','));
      }
      if (filters.dateFrom) {
        params.append('dateFrom', filters.dateFrom.toISOString().split('T')[0]);
      }
      if (filters.dateTo) {
        params.append('dateTo', filters.dateTo.toISOString().split('T')[0]);
      }
      if (search) {
        params.append('search', search);
      }
      if (sortBy) {
        params.append('sortBy', sortBy);
      }

      const response = await fetch(`/api/appointments?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setAppointments(data.data);
      } else {
        setError(data.error || 'Failed to fetch appointments');
      }
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: Partial<AppointmentFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({});
    setSearch('');
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <FiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      {/* Search and Sort */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <AppointmentSearch onSearchChange={handleSearchChange} />
          </div>
          <div className="sm:w-48">
            <AppointmentSorter sortBy={sortBy} onSortChange={handleSortChange} />
          </div>
        </div>
      </Card>

      {/* Results */}
      <div>
        {loading ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-600">Loading appointments...</p>
            </div>
          </Card>
        ) : error ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
              <Button
                variant="primary"
                onClick={fetchAppointments}
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          </Card>
        ) : appointments.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-600">No appointments found</p>
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your filters or search criteria
              </p>
            </div>
          </Card>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Found <span className="font-medium">{appointments.length}</span> appointment
                {appointments.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}