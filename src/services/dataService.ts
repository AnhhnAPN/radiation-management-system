import type { Employee, Department, Position } from '../types/employee';
import type {
  Dosimeter,
  TrainingUnit,
  DosimetryAgency,
  RadiationSource,
  EquipmentType
} from '../types/categories';
import initialData from '../data/data.json';

interface AppData {
  departments: Department[];
  positions: Position[];
  employees: Employee[];
  dosimeters: Dosimeter[];
  trainingUnits: TrainingUnit[];
  dosimetryAgencies: DosimetryAgency[];
  radiationSources: RadiationSource[];
  equipmentTypes: EquipmentType[];
}

let data: AppData = loadFromStorage() || (initialData as AppData);

// Hàm đọc dữ liệu từ localStorage
function loadFromStorage(): AppData | null {
  try {
    const savedData = localStorage.getItem('radiationManagementData');
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
}

// Hàm lưu dữ liệu vào localStorage
function saveToStorage(): void {
  try {
    localStorage.setItem('radiationManagementData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
}

// Department services
export const getAllDepartments = (): Department[] => data.departments;

export const addDepartment = (department: Department): void => {
  data.departments.push(department);
  saveToStorage();
};

export const updateDepartment = (id: string, updatedDepartment: Department): void => {
  const index = data.departments.findIndex(dept => dept.id === id);
  if (index !== -1) {
    data.departments[index] = updatedDepartment;
    saveToStorage();
  }
};

export const deleteDepartment = (id: string): void => {
  const index = data.departments.findIndex(dept => dept.id === id);
  if (index !== -1) {
    data.departments.splice(index, 1);
    saveToStorage();
  }
};

// Position services
export const getAllPositions = (): Position[] => data.positions;

export const addPosition = (position: Position): void => {
  data.positions.push(position);
  saveToStorage();
};

export const updatePosition = (id: string, updatedPosition: Position): void => {
  const index = data.positions.findIndex(pos => pos.id === id);
  if (index !== -1) {
    data.positions[index] = updatedPosition;
    saveToStorage();
  }
};

export const deletePosition = (id: string): void => {
  const index = data.positions.findIndex(pos => pos.id === id);
  if (index !== -1) {
    data.positions.splice(index, 1);
    saveToStorage();
  }
};

// Employee services
export const getAllEmployees = (): Employee[] => {
  return data.employees.map(emp => ({
    ...emp,
    department: data.departments.find(d => d.id === emp.departmentId),
    position: data.positions.find(p => p.id === emp.positionId)
  }));
};

export const addEmployee = (employee: Employee): void => {
  data.employees.push(employee);
  saveToStorage();
};

export const updateEmployee = (id: string, updatedEmployee: Employee): void => {
  const index = data.employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    data.employees[index] = updatedEmployee;
    saveToStorage();
  }
};

export const deleteEmployee = (id: string): void => {
  const index = data.employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    data.employees.splice(index, 1);
    saveToStorage();
  }
};

// Dosimeter services
export const getAllDosimeters = (): Dosimeter[] => {
  return data.dosimeters.map(dosimeter => ({
    ...dosimeter,
    assignedToName: data.employees.find(emp => emp.id === dosimeter.assignedTo)?.name
  }));
};

export const addDosimeter = (dosimeter: Dosimeter): void => {
  data.dosimeters.push(dosimeter);
  saveToStorage();
};

export const updateDosimeter = (id: string, updatedDosimeter: Dosimeter): void => {
  const index = data.dosimeters.findIndex(d => d.id === id);
  if (index !== -1) {
    data.dosimeters[index] = updatedDosimeter;
    saveToStorage();
  }
};

export const deleteDosimeter = (id: string): void => {
  const index = data.dosimeters.findIndex(d => d.id === id);
  if (index !== -1) {
    data.dosimeters.splice(index, 1);
    saveToStorage();
  }
};

// Training Unit services
export const getAllTrainingUnits = (): TrainingUnit[] => data.trainingUnits;

export const addTrainingUnit = (unit: TrainingUnit): void => {
  data.trainingUnits.push(unit);
  saveToStorage();
};

export const updateTrainingUnit = (id: string, updatedUnit: TrainingUnit): void => {
  const index = data.trainingUnits.findIndex(u => u.id === id);
  if (index !== -1) {
    data.trainingUnits[index] = updatedUnit;
    saveToStorage();
  }
};

export const deleteTrainingUnit = (id: string): void => {
  const index = data.trainingUnits.findIndex(u => u.id === id);
  if (index !== -1) {
    data.trainingUnits.splice(index, 1);
    saveToStorage();
  }
};

// Dosimetry Agency services
export const getAllDosimetryAgencies = (): DosimetryAgency[] => data.dosimetryAgencies;

export const addDosimetryAgency = (agency: DosimetryAgency): void => {
  data.dosimetryAgencies.push(agency);
  saveToStorage();
};

export const updateDosimetryAgency = (id: string, updatedAgency: DosimetryAgency): void => {
  const index = data.dosimetryAgencies.findIndex(a => a.id === id);
  if (index !== -1) {
    data.dosimetryAgencies[index] = updatedAgency;
    saveToStorage();
  }
};

export const deleteDosimetryAgency = (id: string): void => {
  const index = data.dosimetryAgencies.findIndex(a => a.id === id);
  if (index !== -1) {
    data.dosimetryAgencies.splice(index, 1);
    saveToStorage();
  }
};

// Radiation Source services
export const getAllRadiationSources = (): RadiationSource[] => data.radiationSources;

export const addRadiationSource = (source: RadiationSource): void => {
  data.radiationSources.push(source);
  saveToStorage();
};

export const updateRadiationSource = (id: string, updatedSource: RadiationSource): void => {
  const index = data.radiationSources.findIndex(s => s.id === id);
  if (index !== -1) {
    data.radiationSources[index] = updatedSource;
    saveToStorage();
  }
};

export const deleteRadiationSource = (id: string): void => {
  const index = data.radiationSources.findIndex(s => s.id === id);
  if (index !== -1) {
    data.radiationSources.splice(index, 1);
    saveToStorage();
  }
};

// Equipment Type services
export const getAllEquipmentTypes = (): EquipmentType[] => data.equipmentTypes;

export const addEquipmentType = (type: EquipmentType): void => {
  data.equipmentTypes.push(type);
  saveToStorage();
};

export const updateEquipmentType = (id: string, updatedType: EquipmentType): void => {
  const index = data.equipmentTypes.findIndex(t => t.id === id);
  if (index !== -1) {
    data.equipmentTypes[index] = updatedType;
    saveToStorage();
  }
};

export const deleteEquipmentType = (id: string): void => {
  const index = data.equipmentTypes.findIndex(t => t.id === id);
  if (index !== -1) {
    data.equipmentTypes.splice(index, 1);
    saveToStorage();
  }
}; 