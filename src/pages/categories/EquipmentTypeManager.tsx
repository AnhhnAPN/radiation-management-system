import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import { dataService } from '../../services/dataService';
import type { EquipmentType } from '../../types/categories';

const EquipmentTypeManager: React.FC = () => {
  const [types, setTypes] = useState<EquipmentType[]>([]);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = () => {
    const data = dataService.getAllEquipmentTypes();
    setTypes(data);
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
      title="Quản lý Loại thiết bị"
      items={types}
      fields={fields}
      onAdd={(type) => {
        dataService.addEquipmentType(type as EquipmentType);
        loadTypes();
      }}
      onUpdate={(id, type) => {
        dataService.updateEquipmentType(id, type as EquipmentType);
        loadTypes();
      }}
      onDelete={(id) => {
        dataService.deleteEquipmentType(id);
        loadTypes();
      }}
    />
  );
};

export default EquipmentTypeManager; 