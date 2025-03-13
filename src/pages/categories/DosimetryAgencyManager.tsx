import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import { dataService } from '../../services/dataService';
import type { DosimetryAgency } from '../../types/categories';

const DosimetryAgencyManager: React.FC = () => {
  const [agencies, setAgencies] = useState<DosimetryAgency[]>([]);

  useEffect(() => {
    loadAgencies();
  }, []);

  const loadAgencies = () => {
    const data = dataService.getAllDosimetryAgencies();
    setAgencies(data);
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
    },
    {
      key: 'licenseNumber',
      label: 'Số giấy phép',
      type: 'text' as const,
      required: true
    }
  ];

  return (
    <CategoryManager
      title="Quản lý Cơ quan Đo liều"
      items={agencies}
      fields={fields}
      onAdd={(agency) => {
        dataService.addDosimetryAgency(agency as DosimetryAgency);
        loadAgencies();
      }}
      onUpdate={(id, agency) => {
        dataService.updateDosimetryAgency(id, agency as DosimetryAgency);
        loadAgencies();
      }}
      onDelete={(id) => {
        dataService.deleteDosimetryAgency(id);
        loadAgencies();
      }}
    />
  );
};

export default DosimetryAgencyManager; 