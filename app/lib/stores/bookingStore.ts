'use client';

import { create } from 'zustand';
import { BookingState } from '../../../lib/types/booking.types';
import { PatientDetails } from '../../../lib/types/appointment.types';
import { Department, Doctor } from '../../../lib/types/doctor.types';

const initialState = {
  selectedDepartment: null,
  selectedDoctor: null,
  selectedDate: null,
  selectedSlot: null,
  patientDetails: {},
  currentStep: 1,
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  setDepartment: (department) =>
    set((state) => ({
      selectedDepartment: department,
      // Reset doctor when department changes
      selectedDoctor: department?.name === state.selectedDepartment?.name ? state.selectedDoctor : null,
    })),

  setDoctor: (doctor) => set({ selectedDoctor: doctor }),

  setDate: (date) => set({ selectedDate: date }),

  setSlot: (slot) => set({ selectedSlot: slot }),

  setPatientDetails: (details) =>
    set((state) => ({
      patientDetails: { ...state.patientDetails, ...details },
    })),

  setStep: (step) => set({ currentStep: step }),

  reset: () => set(initialState),
}));

