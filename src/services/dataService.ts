import { TrainingUnit, DosimetryAgency, RadiationSource, EquipmentType } from '../types/categories';
import initialData from '../data/data.json';

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: 'admin' | 'user';
}

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

interface AppData {
  users: User[];
  departments: Department[];
  positions: Position[];
  employees: Employee[];
  dosimeters: Dosimeter[];
  trainingUnits: TrainingUnit[];
  dosimetryAgencies: DosimetryAgency[];
  radiationSources: RadiationSource[];
  equipmentTypes: EquipmentType[];
}

// Hàm đọc dữ liệu từ localStorage
const loadFromStorage = (): AppData | null => {
  const savedData = localStorage.getItem('radiation_management_data');
  return savedData ? JSON.parse(savedData) : null;
};

// Hàm lưu dữ liệu vào localStorage
const saveToStorage = (appData: AppData): void => {
  localStorage.setItem('radiation_management_data', JSON.stringify(appData));
};

// Hàm chuyển đổi dữ liệu từ initialData sang AppData
const convertInitialData = (data: any): AppData => {
  // Đảm bảo có dữ liệu người dùng
  const users = data.users || [
    {
      id: "1",
      username: "admin",
      password: "admin123",
      fullName: "Administrator",
      email: "admin@example.com",
      role: "admin"
    },
    {
      id: "2",
      username: "user",
      password: "user123",
      fullName: "Normal User",
      email: "user@example.com",
      role: "user"
    }
  ];

  return {
    ...data,
    users,
    dosimeters: (data.dosimeters || []).map((d: any) => ({
      ...d,
      status: d.status as 'active' | 'inactive' | 'maintenance' || 'active'
    }))
  };
};

// Khởi tạo dữ liệu
const appData: AppData = loadFromStorage() || convertInitialData(initialData);

export const dataService = {
  // Reset dữ liệu về mặc định
  resetData: (): void => {
    localStorage.removeItem('radiation_management_data');
    localStorage.removeItem('radiation_management_user');
    window.location.reload();
  },

  // Đăng nhập
  login: (username: string, password: string): User => {
    const user = appData.users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) throw new Error('Invalid username or password');
    return user;
  },

  // Lấy thông tin người dùng theo ID
  getUserById: (id: string): User | undefined => {
    return appData.users.find((u) => u.id === id);
  },

  // Cập nhật thông tin người dùng
  updateUserProfile: (id: string, profile: Partial<User>): void => {
    const index = appData.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    // Không cho phép thay đổi role qua hàm này
    const { role, ...updateData } = profile;
    appData.users[index] = { ...appData.users[index], ...updateData };
    saveToStorage(appData);
  },

  // Đổi mật khẩu
  changePassword: (id: string, currentPassword: string, newPassword: string): void => {
    const index = appData.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    if (appData.users[index].password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }
    
    appData.users[index].password = newPassword;
    saveToStorage(appData);
  },

  // Lấy danh sách nhân viên
  getAllEmployees: (): Employee[] => {
    return appData.employees;
  },

  // Thêm nhân viên mới
  addEmployee: (employee: Employee): void => {
    appData.employees.push(employee);
    saveToStorage(appData);
  },

  // Cập nhật thông tin nhân viên
  updateEmployee: (id: string, employee: Employee): void => {
    const index = appData.employees.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Employee not found');
    appData.employees[index] = employee;
    saveToStorage(appData);
  },

  // Xóa nhân viên
  deleteEmployee: (id: string): void => {
    const index = appData.employees.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Employee not found');
    appData.employees.splice(index, 1);
    saveToStorage(appData);
  },

  // Import danh sách nhân viên từ file Excel
  importEmployees: (newEmployees: Employee[]): void => {
    appData.employees = [...appData.employees, ...newEmployees];
    saveToStorage(appData);
  },

  // Export danh sách nhân viên ra file Excel
  exportEmployees: (): Blob => {
    const data = JSON.stringify(appData.employees, null, 2);
    return new Blob([data], { type: 'application/json' });
  },

  // Lấy danh sách liều kế
  getAllDosimeters: (): Dosimeter[] => {
    return appData.dosimeters || [];
  },

  // Thêm liều kế mới
  addDosimeter: (dosimeter: Dosimeter): void => {
    if (!appData.dosimeters) {
      appData.dosimeters = [];
    }
    appData.dosimeters.push(dosimeter);
    saveToStorage(appData);
  },

  // Cập nhật thông tin liều kế
  updateDosimeter: (id: string, dosimeter: Dosimeter): void => {
    if (!appData.dosimeters) {
      appData.dosimeters = [];
    }
    const index = appData.dosimeters.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Dosimeter not found');
    appData.dosimeters[index] = dosimeter;
    saveToStorage(appData);
  },

  // Xóa liều kế
  deleteDosimeter: (id: string): void => {
    if (!appData.dosimeters) {
      appData.dosimeters = [];
    }
    const index = appData.dosimeters.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Dosimeter not found');
    appData.dosimeters.splice(index, 1);
    saveToStorage(appData);
  },

  // Lấy danh sách phòng ban
  getAllDepartments: (): Department[] => {
    return appData.departments;
  },

  // Thêm phòng ban mới
  addDepartment: (department: Department): void => {
    appData.departments.push(department);
    saveToStorage(appData);
  },

  // Cập nhật thông tin phòng ban
  updateDepartment: (id: string, department: Department): void => {
    const index = appData.departments.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Department not found');
    appData.departments[index] = department;
    saveToStorage(appData);
  },

  // Xóa phòng ban
  deleteDepartment: (id: string): void => {
    const index = appData.departments.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Department not found');
    appData.departments.splice(index, 1);
    saveToStorage(appData);
  },

  // Lấy danh sách chức vụ
  getAllPositions: (): Position[] => {
    return appData.positions;
  },

  // Thêm chức vụ mới
  addPosition: (position: Position): void => {
    appData.positions.push(position);
    saveToStorage(appData);
  },

  // Cập nhật thông tin chức vụ
  updatePosition: (id: string, position: Position): void => {
    const index = appData.positions.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Position not found');
    appData.positions[index] = position;
    saveToStorage(appData);
  },

  // Xóa chức vụ
  deletePosition: (id: string): void => {
    const index = appData.positions.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Position not found');
    appData.positions.splice(index, 1);
    saveToStorage(appData);
  },

  // Lấy danh sách đơn vị đào tạo
  getAllTrainingUnits: (): TrainingUnit[] => {
    return appData.trainingUnits;
  },

  // Thêm đơn vị đào tạo mới
  addTrainingUnit: (unit: TrainingUnit): void => {
    appData.trainingUnits.push(unit);
    saveToStorage(appData);
  },

  // Cập nhật thông tin đơn vị đào tạo
  updateTrainingUnit: (id: string, unit: TrainingUnit): void => {
    const index = appData.trainingUnits.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('Training unit not found');
    appData.trainingUnits[index] = unit;
    saveToStorage(appData);
  },

  // Xóa đơn vị đào tạo
  deleteTrainingUnit: (id: string): void => {
    const index = appData.trainingUnits.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('Training unit not found');
    appData.trainingUnits.splice(index, 1);
    saveToStorage(appData);
  },

  // Lấy danh sách cơ quan đo liều
  getAllDosimetryAgencies: (): DosimetryAgency[] => {
    return appData.dosimetryAgencies;
  },

  // Thêm cơ quan đo liều mới
  addDosimetryAgency: (agency: DosimetryAgency): void => {
    appData.dosimetryAgencies.push(agency);
    saveToStorage(appData);
  },

  // Cập nhật thông tin cơ quan đo liều
  updateDosimetryAgency: (id: string, agency: DosimetryAgency): void => {
    const index = appData.dosimetryAgencies.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Dosimetry agency not found');
    appData.dosimetryAgencies[index] = agency;
    saveToStorage(appData);
  },

  // Xóa cơ quan đo liều
  deleteDosimetryAgency: (id: string): void => {
    const index = appData.dosimetryAgencies.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Dosimetry agency not found');
    appData.dosimetryAgencies.splice(index, 1);
    saveToStorage(appData);
  },

  // Lấy danh sách nguồn phóng xạ
  getAllRadiationSources: (): RadiationSource[] => {
    return appData.radiationSources;
  },

  // Thêm nguồn phóng xạ mới
  addRadiationSource: (source: RadiationSource): void => {
    appData.radiationSources.push(source);
    saveToStorage(appData);
  },

  // Cập nhật thông tin nguồn phóng xạ
  updateRadiationSource: (id: string, source: RadiationSource): void => {
    const index = appData.radiationSources.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Radiation source not found');
    appData.radiationSources[index] = source;
    saveToStorage(appData);
  },

  // Xóa nguồn phóng xạ
  deleteRadiationSource: (id: string): void => {
    const index = appData.radiationSources.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Radiation source not found');
    appData.radiationSources.splice(index, 1);
    saveToStorage(appData);
  },

  // Lấy danh sách loại thiết bị
  getAllEquipmentTypes: (): EquipmentType[] => {
    return appData.equipmentTypes;
  },

  // Thêm loại thiết bị mới
  addEquipmentType: (type: EquipmentType): void => {
    appData.equipmentTypes.push(type);
    saveToStorage(appData);
  },

  // Cập nhật thông tin loại thiết bị
  updateEquipmentType: (id: string, type: EquipmentType): void => {
    const index = appData.equipmentTypes.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Equipment type not found');
    appData.equipmentTypes[index] = type;
    saveToStorage(appData);
  },

  // Xóa loại thiết bị
  deleteEquipmentType: (id: string): void => {
    const index = appData.equipmentTypes.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Equipment type not found');
    appData.equipmentTypes.splice(index, 1);
    saveToStorage(appData);
  }
}; 