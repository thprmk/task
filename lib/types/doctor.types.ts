export interface Department {
  _id?: string;
  name: string;
  description?: string;
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
}






