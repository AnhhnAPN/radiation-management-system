import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import { dataService } from '../../services/dataService';
import type { RadiationSource } from '../../types/categories';

const RadiationSourceManager: React.FC = () => {
  const [sources, setSources] = useState<RadiationSource[]>([]);

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = () => {
    const data = dataService.getAllRadiationSources();
    setSources(data);
  };

  const fields = [
    {
      key: 'type',
      label: 'Loại',
      type: 'text' as const,
      required: true
    },
    {
      key: 'activity',
      label: 'Hoạt độ',
      type: 'text' as const,
      required: true
    },
    {
      key: 'manufacturer',
      label: 'Nhà sản xuất',
      type: 'text' as const,
      required: true
    }
  ];

  return (
    <CategoryManager
      title="Quản lý Nguồn phóng xạ"
      items={sources}
      fields={fields}
      onAdd={(source) => {
        dataService.addRadiationSource(source as RadiationSource);
        loadSources();
      }}
      onUpdate={(id, source) => {
        dataService.updateRadiationSource(id, source as RadiationSource);
        loadSources();
      }}
      onDelete={(id) => {
        dataService.deleteRadiationSource(id);
        loadSources();
      }}
    />
  );
};

export default RadiationSourceManager; 