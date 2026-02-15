export enum AppointmentStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

export interface PatientDetails {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  reason: string;
}

export interface Appointment {
  _id?: string;
  doctorId: string;
  departmentId: string;
  date: Date | string;
  timeSlot: string; // Format: "09:00-09:30"
  status: AppointmentStatus;
  patient: PatientDetails;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppointmentFilters {
  departmentId?: string;
  doctorId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: AppointmentStatus[];
  search?: string;
}

export type SortOption = 
  | 'upcoming'
  | 'oldest'
  | 'doctor-asc'
  | 'doctor-desc'
  | 'department-asc'
  | 'department-desc';






