import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import {
  getAllEquipmentTypes,
  addEquipmentType,
  updateEquipmentType,
  deleteEquipmentType,
  type EquipmentType
} from '../../services/dataService';

const EquipmentTypeManager: React.FC = () => {
  const [types, setTypes] = useState<EquipmentType[]>([]);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = () => {
    const data = getAllEquipmentTypes();
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
        addEquipmentType(type as EquipmentType);
        loadTypes();
      }}
      onUpdate={(id, type) => {
        updateEquipmentType(id, type as EquipmentType);
        loadTypes();
      }}
      onDelete={(id) => {
        deleteEquipmentType(id);
        loadTypes();
      }}
    />
  );
};

export default EquipmentTypeManager; 