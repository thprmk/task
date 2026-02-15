'use client';

import { create } from 'zustand';
import { Appointment, AppointmentFilters, SortOption } from '../../../lib/types/appointment.types';

interface AppointmentStore {
  appointments: Appointment[];
  filters: AppointmentFilters;
  sortBy: SortOption;
  setAppointments: (appointments: Appointment[]) => void;
  setFilters: (filters: Partial<AppointmentFilters>) => void;
  setSortBy: (sort: SortOption) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  removeAppointment: (id: string) => void;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [],
  filters: {},
  sortBy: 'upcoming',

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
    })),

  removeAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((apt) => apt._id !== id),
    })),
}));

