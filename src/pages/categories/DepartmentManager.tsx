import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import { dataService } from '../../services/dataService';
import type { Department } from '../../services/dataService';

const DepartmentManager: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = () => {
    const data = dataService.getAllDepartments();
    setDepartments(data);
  };

  const fields = [
    {
      key: 'description',
      label: 'Mô tả',
      type: 'textarea' as const,
      required: false
    }
  ];

  return (
    <CategoryManager
      title="Quản lý Phòng ban"
      items={departments}
      fields={fields}
      onAdd={(department) => {
        dataService.addDepartment(department as Department);
        loadDepartments();
      }}
      onUpdate={(id, department) => {
        dataService.updateDepartment(id, department as Department);
        loadDepartments();
      }}
      onDelete={(id) => {
        dataService.deleteDepartment(id);
        loadDepartments();
      }}
    />
  );
};

export default DepartmentManager; 