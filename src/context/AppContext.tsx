import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import type { Employee, Dosimeter } from '../services/dataService';

interface RadiationRecord {
  id: string;
  employeeId: string;
  date: string;
  dosimeterReading: number;
}

interface TrainingCourse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  participants: string[];
}

interface AppContextType {
  employees: Employee[];
  dosimeters: Dosimeter[];
  radiationRecords: RadiationRecord[];
  trainingCourses: TrainingCourse[];
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dosimeters, setDosimeters] = useState<Dosimeter[]>([]);
  const [radiationRecords, setRadiationRecords] = useState<RadiationRecord[]>([]);
  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>([]);

  const loadData = () => {
    setEmployees(dataService.getAllEmployees());
    setDosimeters(dataService.getAllDosimeters());
    // Tạm thời để mảng rỗng cho radiationRecords và trainingCourses
    setRadiationRecords([]);
    setTrainingCourses([]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        employees,
        dosimeters,
        radiationRecords,
        trainingCourses,
        refreshData: loadData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};