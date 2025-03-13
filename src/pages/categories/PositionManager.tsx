import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import { dataService } from '../../services/dataService';
import type { Position } from '../../services/dataService';

const PositionManager: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    loadPositions();
  }, []);

  const loadPositions = () => {
    const data = dataService.getAllPositions();
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
        dataService.addPosition(position as Position);
        loadPositions();
      }}
      onUpdate={(id, position) => {
        dataService.updatePosition(id, position as Position);
        loadPositions();
      }}
      onDelete={(id) => {
        dataService.deletePosition(id);
        loadPositions();
      }}
    />
  );
};

export default PositionManager; 