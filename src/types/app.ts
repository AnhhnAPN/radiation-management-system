export interface Department {
  id: string;
  code: string;
  name: string;
}

export interface Position {
  id: string;
  code: string;
  name: string;
}

export interface Employee {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  positionId: string;
  startDate: string;
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

export interface AppData {
  departments: Department[];
  positions: Position[];
  employees: Employee[];
  trainingUnits: TrainingUnit[];
  dosimetryAgencies: DosimetryAgency[];
  radiationSources: RadiationSource[];
  equipmentTypes: EquipmentType[];
} 