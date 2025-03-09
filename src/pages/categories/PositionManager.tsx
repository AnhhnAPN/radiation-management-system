import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import {
  getAllPositions,
  addPosition,
  updatePosition,
  deletePosition,
  type Position
} from '../../services/dataService';

const PositionManager: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    loadPositions();
  }, []);

  const loadPositions = () => {
    const data = getAllPositions();
    setPositions(data);
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
      title="Quản lý Chức vụ"
      items={positions}
      fields={fields}
      onAdd={(position) => {
        addPosition(position as Position);
        loadPositions();
      }}
      onUpdate={(id, position) => {
        updatePosition(id, position as Position);
        loadPositions();
      }}
      onDelete={(id) => {
        deletePosition(id);
        loadPositions();
      }}
    />
  );
};

export default PositionManager; 