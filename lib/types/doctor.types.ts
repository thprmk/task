export interface Department {
  _id?: string;
  name: string;
  description?: string;
  isActive?: boolean;
  icon?: string;
}

export interface WorkingHours {
  start: string; // Format: "09:00"
  end: string;   // Format: "17:00"
}

export interface Doctor {
  _id?: string;
  name: string;
  departmentId: string;
  specialization: string;
  workingHours: WorkingHours;
  breakTime?: WorkingHours;
  weeklyOff: number[]; // [0,6] for Sunday, Saturday
  slotDuration?: number; // minutes, default 30
  experience?: string;
  education?: string[];
  languages?: string[];
  imageUrl?: string;
}






