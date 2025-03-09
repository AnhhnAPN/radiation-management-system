export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  dateOfBirth: string;
  joinDate: string;
  contactInfo: string;
  dosimeterId?: string;
}

export interface RadiationRecord {
  id: string;
  employeeId: string;
  date: string;
  dosimeterReading: number;
  location: string;
  radiationType: string;
  notes?: string;
}

export interface TrainingCourse {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  instructor: string;
  participants: string[];
  status: 'scheduled' | 'in-progress' | 'completed';
}

export interface Dosimeter {
  id: string;
  serialNumber: string;
  type: string;
  calibrationDate: string;
  nextCalibrationDate: string;
  status: 'available' | 'assigned' | 'maintenance';
  assignedTo?: string;
  issueDate?: string;
  returnDate?: string;
}