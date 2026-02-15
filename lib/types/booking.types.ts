import { PatientDetails } from './appointment.types';
import { Doctor, Department } from './doctor.types';

export interface BookingState {
  // Step 1: Department
  selectedDepartment: Department | null;
  
  // Step 2: Doctor
  selectedDoctor: Doctor | null;
  
  // Step 3: Date
  selectedDate: Date | null;
  
  // Step 4: Time Slot
  selectedSlot: string | null; // Format: "09:00-09:30"
  
  // Step 5: Patient Details
  patientDetails: Partial<PatientDetails>;
  
  // Current step
  currentStep: number;
  
  // Actions
  setDepartment: (department: Department | null) => void;
  setDoctor: (doctor: Doctor | null) => void;
  setDate: (date: Date | null) => void;
  setSlot: (slot: string | null) => void;
  setPatientDetails: (details: Partial<PatientDetails>) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export interface SlotConfig {
  slotDuration: number; // minutes (default: 30)
  workingHours: { start: string; end: string };
  breakTime?: { start: string; end: string };
  weeklyOff: number[];
  holidays: Date[];
}






