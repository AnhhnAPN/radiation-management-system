import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import {
  getAllTrainingUnits,
  addTrainingUnit,
  updateTrainingUnit,
  deleteTrainingUnit,
  type TrainingUnit
} from '../../services/dataService';

const TrainingUnitManager: React.FC = () => {
  const [units, setUnits] = useState<TrainingUnit[]>([]);

  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = () => {
    const data = getAllTrainingUnits();
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
        addTrainingUnit(unit as TrainingUnit);
        loadUnits();
      }}
      onUpdate={(id, unit) => {
        updateTrainingUnit(id, unit as TrainingUnit);
        loadUnits();
      }}
      onDelete={(id) => {
        deleteTrainingUnit(id);
        loadUnits();
      }}
    />
  );
};

export default TrainingUnitManager; 