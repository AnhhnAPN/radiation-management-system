import React, { useState, useEffect } from 'react';
import CategoryManager from '../../components/CategoryManager';
import {
  getAllDosimetryAgencies,
  addDosimetryAgency,
  updateDosimetryAgency,
  deleteDosimetryAgency,
  type DosimetryAgency
} from '../../services/dataService';

const DosimetryAgencyManager: React.FC = () => {
  const [agencies, setAgencies] = useState<DosimetryAgency[]>([]);

  useEffect(() => {
    loadAgencies();
  }, []);

  const loadAgencies = () => {
    const data = getAllDosimetryAgencies();
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
        addDosimetryAgency(agency as DosimetryAgency);
        loadAgencies();
      }}
      onUpdate={(id, agency) => {
        updateDosimetryAgency(id, agency as DosimetryAgency);
        loadAgencies();
      }}
      onDelete={(id) => {
        deleteDosimetryAgency(id);
        loadAgencies();
      }}
    />
  );
};

export default DosimetryAgencyManager; 