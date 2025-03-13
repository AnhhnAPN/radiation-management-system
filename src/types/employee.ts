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
  department?: Department;
  positionId: string;
  position?: Position;
  startDate: string;
} 