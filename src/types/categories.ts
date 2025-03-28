export interface Dosimeter {
  id: string;
  code: string;
  name: string;
  serialNumber: string;
  assignedTo: string;
  lastCalibrationDate: string;
  nextCalibrationDate: string;
  status: 'active' | 'inactive' | 'maintenance';
  description: string;
}

export interface TrainingUnit {
  id: string;
  code: string;
  name: string;
}

export interface DosimetryAgency {
  id: string;
  code: string;
  name: string;
}

export interface RadiationSource {
  id: string;
  code: string;
  name: string;
}

export interface EquipmentType {
  id: string;
  code: string;
  name: string;
} 