import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import { dataService } from '../../services/dataService';
import type { TrainingUnit } from '../../types/categories';

const TrainingUnitManager: React.FC = () => {
  const [units, setUnits] = useState<TrainingUnit[]>([]);

  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = () => {
    const data = dataService.getAllTrainingUnits();
    setUnits(data);
  };

  const fields = [
    {
      key: 'address',
      label: 'Địa chỉ',
      type: 'text' as const,
      required: true
    },
    {
      key: 'contact',
      label: 'Liên hệ',
      type: 'text' as const,
      required: true
    }
  ];

  return (
    <CategoryManager
      title="Quản lý Đơn vị Đào tạo"
      items={units}
      fields={fields}
      onAdd={(unit) => {
        dataService.addTrainingUnit(unit as TrainingUnit);
        loadUnits();
      }}
      onUpdate={(id, unit) => {
        dataService.updateTrainingUnit(id, unit as TrainingUnit);
        loadUnits();
      }}
      onDelete={(id) => {
        dataService.deleteTrainingUnit(id);
        loadUnits();
      }}
    />
  );
};

export default TrainingUnitManager; 