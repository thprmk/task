'use client';

import { create } from 'zustand';
import { Appointment, AppointmentFilters, SortOption } from '../../../lib/types/appointment.types';

interface AppointmentStore {
  appointments: Appointment[];
  filters: AppointmentFilters;
  sortBy: SortOption;
  /** Bumped when an appointment is updated so List and Calendar can refetch / re-render */
  appointmentInvalidationVersion: number;
  setAppointments: (appointments: Appointment[]) => void;
  setFilters: (filters: Partial<AppointmentFilters>) => void;
  setSortBy: (sort: SortOption) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  removeAppointment: (id: string) => void;
  bumpAppointmentInvalidation: () => void;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [],
  filters: {},
  sortBy: 'upcoming',
  appointmentInvalidationVersion: 0,

  setAppointments: (appointments) => set({ appointments }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  setSortBy: (sortBy) => set({ sortBy }),

  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [...state.appointments, appointment],
    })),

  updateAppointment: (id, updates) =>
    set((state) => ({
      appointments: state.appointments.map((apt) =>
        apt._id === id ? { ...apt, ...updates } : apt
      ),
      appointmentInvalidationVersion: state.appointmentInvalidationVersion + 1,
    })),

  bumpAppointmentInvalidation: () =>
    set((state) => ({ appointmentInvalidationVersion: state.appointmentInvalidationVersion + 1 })),

  removeAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((apt) => apt._id !== id),
    })),
}));

