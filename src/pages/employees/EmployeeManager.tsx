import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllDepartments,
  getAllPositions
} from '../../services/dataService';
import type { Employee, Department, Position } from '../../types/employee';

interface EmployeeItem {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  positionId: string;
  startDate: string;
}

const EmployeeManager: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeItem[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    loadEmployees();
    loadDepartments();
    loadPositions();
  }, []);

  const loadEmployees = () => {
    const data = getAllEmployees();
    setEmployees(data.map(emp => ({
      id: emp.id,
      code: emp.code,
      name: emp.name,
      departmentId: emp.departmentId,
      positionId: emp.positionId,
      startDate: emp.startDate
    })));
  };

  const loadDepartments = () => {
    const data = getAllDepartments();
    setDepartments(data);
  };

  const loadPositions = () => {
    const data = getAllPositions();
    setPositions(data);
  };

  const fields = [
    {
      key: 'departmentId',
      label: 'Phòng ban',
      type: 'select' as const,
      required: true,
      options: departments.map(dept => ({
        value: dept.id,
        label: dept.name
      }))
    },
    {
      key: 'positionId',
      label: 'Chức vụ',
      type: 'select' as const,
      required: true,
      options: positions.map(pos => ({
        value: pos.id,
        label: pos.name
      }))
    },
    {
      key: 'startDate',
      label: 'Ngày vào làm',
      type: 'date' as const,
      required: true
    }
  ];

  const convertToEmployee = (item: EmployeeItem): Employee => ({
    ...item,
    department: departments.find(d => d.id === item.departmentId),
    position: positions.find(p => p.id === item.positionId)
  });

  return (
    <CategoryManager
      title="Quản lý Nhân viên"
      items={employees}
      fields={fields}
      onAdd={(employee) => {
        addEmployee(convertToEmployee(employee as EmployeeItem));
        loadEmployees();
      }}
      onUpdate={(id, employee) => {
        updateEmployee(id, convertToEmployee(employee as EmployeeItem));
        loadEmployees();
      }}
      onDelete={(id) => {
        deleteEmployee(id);
        loadEmployees();
      }}
    />
  );
};

export default EmployeeManager; 