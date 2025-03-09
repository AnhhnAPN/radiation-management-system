export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  dateOfBirth: string;
  joinDate: string;
  contactInfo: string;
}

export interface Dosimeter {
  id: string;
  serialNumber: string;
  assignedTo: string;
  lastCalibrationDate: string;
  nextCalibrationDate: string;
  status: 'active' | 'inactive' | 'maintenance';
}

export interface Department {
  id: string;
  code: string;
  name: string;
  description?: string;
}

export interface TrainingUnit {
  id: string;
  code: string;
  name: string;
  address: string;
  contact: string;
}

export interface DosimetryAgency {
  id: string;
  code: string;
  name: string;
  address: string;
  contact: string;
  licenseNumber: string;
}

export interface RadiationSource {
  id: string;
  code: string;
  name: string;
  type: string;
  activity: string;
  manufacturer: string;
}

export interface EquipmentType {
  id: string;
  code: string;
  name: string;
  description?: string;
}

export interface Position {
  id: string;
  code: string;
  name: string;
  description?: string;
}

interface DatabaseData {
  employees: Employee[];
  dosimeters: Dosimeter[];
  departments: Department[];
  trainingUnits: TrainingUnit[];
  dosimetryAgencies: DosimetryAgency[];
  radiationSources: RadiationSource[];
  equipmentTypes: EquipmentType[];
  positions: Position[];
}

const STORAGE_KEY = 'radiation_management_data';

// Đọc dữ liệu từ localStorage
const readData = (): DatabaseData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Khởi tạo dữ liệu mẫu nếu chưa có
    const initialData: DatabaseData = {
      employees: [
        {
          id: "1",
          name: "Nguyễn Văn A",
          employeeId: "NV001",
          department: "Phòng Kỹ thuật",
          position: "Kỹ sư",
          dateOfBirth: "1990-01-15",
          joinDate: "2020-03-01",
          contactInfo: "0123456789"
        }
      ],
      dosimeters: [
        {
          id: "1",
          serialNumber: "DOS-001",
          assignedTo: "Nguyễn Văn A",
          lastCalibrationDate: "2024-02-01",
          nextCalibrationDate: "2024-08-01",
          status: "active"
        }
      ],
      departments: [
        {
          id: "1",
          code: "PKT",
          name: "Phòng Kỹ thuật",
          description: "Phòng Kỹ thuật và Công nghệ"
        }
      ],
      trainingUnits: [
        {
          id: "1",
          code: "VATLY01",
          name: "Viện Đào tạo An toàn Bức xạ",
          address: "Số 1 Đường ABC, Hà Nội",
          contact: "024.1234.5678"
        }
      ],
      dosimetryAgencies: [
        {
          id: "1",
          code: "VINATOMX",
          name: "Viện Năng lượng Nguyên tử Việt Nam",
          address: "Số 2 Đường XYZ, Hà Nội",
          contact: "024.8765.4321",
          licenseNumber: "LICENSE-001"
        }
      ],
      radiationSources: [
        {
          id: "1",
          code: "CO60-001",
          name: "Cobalt-60",
          type: "Gamma",
          activity: "100 Ci",
          manufacturer: "Manufacturer A"
        }
      ],
      equipmentTypes: [
        {
          id: "1",
          code: "GM-COUNTER",
          name: "Máy đo bức xạ Geiger-Muller",
          description: "Thiết bị đo phóng xạ beta và gamma"
        }
      ],
      positions: [
        {
          id: "1",
          code: "KS",
          name: "Kỹ sư",
          description: "Kỹ sư vận hành và bảo trì"
        }
      ]
    };
    writeData(initialData);
    return initialData;
  } catch (error) {
    console.error('Lỗi khi đọc dữ liệu:', error);
    return {
      employees: [],
      dosimeters: [],
      departments: [],
      trainingUnits: [],
      dosimetryAgencies: [],
      radiationSources: [],
      equipmentTypes: [],
      positions: []
    };
  }
};

// Ghi dữ liệu vào localStorage
const writeData = (data: DatabaseData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Lỗi khi ghi dữ liệu:', error);
  }
};

// Các hàm xử lý Employee
export const getAllEmployees = (): Employee[] => {
  const data = readData();
  return data.employees;
};

export const addEmployee = (employee: Employee): void => {
  const data = readData();
  data.employees.push(employee);
  writeData(data);
};

export const updateEmployee = (id: string, updatedEmployee: Employee): void => {
  const data = readData();
  const index = data.employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    data.employees[index] = updatedEmployee;
    writeData(data);
  }
};

export const deleteEmployee = (id: string): void => {
  const data = readData();
  data.employees = data.employees.filter(emp => emp.id !== id);
  writeData(data);
};

export const importEmployees = (newEmployees: Employee[]): void => {
  const data = readData();
  data.employees = [...data.employees, ...newEmployees];
  writeData(data);
};

// Các hàm xử lý Dosimeter
export const getAllDosimeters = (): Dosimeter[] => {
  const data = readData();
  return data.dosimeters;
};

export const addDosimeter = (dosimeter: Dosimeter): void => {
  const data = readData();
  data.dosimeters.push(dosimeter);
  writeData(data);
};

export const updateDosimeter = (id: string, updatedDosimeter: Dosimeter): void => {
  const data = readData();
  const index = data.dosimeters.findIndex(dos => dos.id === id);
  if (index !== -1) {
    data.dosimeters[index] = updatedDosimeter;
    writeData(data);
  }
};

export const deleteDosimeter = (id: string): void => {
  const data = readData();
  data.dosimeters = data.dosimeters.filter(dos => dos.id !== id);
  writeData(data);
};

// Các hàm xử lý Department
export const getAllDepartments = (): Department[] => {
  const data = readData();
  return data.departments;
};

export const addDepartment = (department: Department): void => {
  const data = readData();
  data.departments.push(department);
  writeData(data);
};

export const updateDepartment = (id: string, updatedDepartment: Department): void => {
  const data = readData();
  const index = data.departments.findIndex(dept => dept.id === id);
  if (index !== -1) {
    data.departments[index] = updatedDepartment;
    writeData(data);
  }
};

export const deleteDepartment = (id: string): void => {
  const data = readData();
  data.departments = data.departments.filter(dept => dept.id !== id);
  writeData(data);
};

// Các hàm xử lý TrainingUnit
export const getAllTrainingUnits = (): TrainingUnit[] => {
  const data = readData();
  return data.trainingUnits;
};

export const addTrainingUnit = (unit: TrainingUnit): void => {
  const data = readData();
  data.trainingUnits.push(unit);
  writeData(data);
};

export const updateTrainingUnit = (id: string, updatedUnit: TrainingUnit): void => {
  const data = readData();
  const index = data.trainingUnits.findIndex(unit => unit.id === id);
  if (index !== -1) {
    data.trainingUnits[index] = updatedUnit;
    writeData(data);
  }
};

export const deleteTrainingUnit = (id: string): void => {
  const data = readData();
  data.trainingUnits = data.trainingUnits.filter(unit => unit.id !== id);
  writeData(data);
};

// Các hàm xử lý DosimetryAgency
export const getAllDosimetryAgencies = (): DosimetryAgency[] => {
  const data = readData();
  return data.dosimetryAgencies;
};

export const addDosimetryAgency = (agency: DosimetryAgency): void => {
  const data = readData();
  data.dosimetryAgencies.push(agency);
  writeData(data);
};

export const updateDosimetryAgency = (id: string, updatedAgency: DosimetryAgency): void => {
  const data = readData();
  const index = data.dosimetryAgencies.findIndex(agency => agency.id === id);
  if (index !== -1) {
    data.dosimetryAgencies[index] = updatedAgency;
    writeData(data);
  }
};

export const deleteDosimetryAgency = (id: string): void => {
  const data = readData();
  data.dosimetryAgencies = data.dosimetryAgencies.filter(agency => agency.id !== id);
  writeData(data);
};

// Các hàm xử lý RadiationSource
export const getAllRadiationSources = (): RadiationSource[] => {
  const data = readData();
  return data.radiationSources;
};

export const addRadiationSource = (source: RadiationSource): void => {
  const data = readData();
  data.radiationSources.push(source);
  writeData(data);
};

export const updateRadiationSource = (id: string, updatedSource: RadiationSource): void => {
  const data = readData();
  const index = data.radiationSources.findIndex(source => source.id === id);
  if (index !== -1) {
    data.radiationSources[index] = updatedSource;
    writeData(data);
  }
};

export const deleteRadiationSource = (id: string): void => {
  const data = readData();
  data.radiationSources = data.radiationSources.filter(source => source.id !== id);
  writeData(data);
};

// Các hàm xử lý EquipmentType
export const getAllEquipmentTypes = (): EquipmentType[] => {
  const data = readData();
  return data.equipmentTypes;
};

export const addEquipmentType = (type: EquipmentType): void => {
  const data = readData();
  data.equipmentTypes.push(type);
  writeData(data);
};

export const updateEquipmentType = (id: string, updatedType: EquipmentType): void => {
  const data = readData();
  const index = data.equipmentTypes.findIndex(type => type.id === id);
  if (index !== -1) {
    data.equipmentTypes[index] = updatedType;
    writeData(data);
  }
};

export const deleteEquipmentType = (id: string): void => {
  const data = readData();
  data.equipmentTypes = data.equipmentTypes.filter(type => type.id !== id);
  writeData(data);
};

// Các hàm xử lý Position
export const getAllPositions = (): Position[] => {
  const data = readData();
  return data.positions;
};

export const addPosition = (position: Position): void => {
  const data = readData();
  data.positions.push(position);
  writeData(data);
};

export const updatePosition = (id: string, updatedPosition: Position): void => {
  const data = readData();
  const index = data.positions.findIndex(pos => pos.id === id);
  if (index !== -1) {
    data.positions[index] = updatedPosition;
    writeData(data);
  }
};

export const deletePosition = (id: string): void => {
  const data = readData();
  data.positions = data.positions.filter(pos => pos.id !== id);
  writeData(data);
}; 