import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Employee, RadiationRecord, TrainingCourse, Dosimeter } from '../types';

interface AppContextType {
  employees: Employee[];
  radiationRecords: RadiationRecord[];
  trainingCourses: TrainingCourse[];
  dosimeters: Dosimeter[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  addRadiationRecord: (record: RadiationRecord) => void;
  addRadiationRecords: (records: RadiationRecord[]) => void;
  addTrainingCourse: (course: TrainingCourse) => void;
  updateTrainingCourse: (id: string, course: TrainingCourse) => void;
  deleteTrainingCourse: (id: string) => void;
  addDosimeter: (dosimeter: Dosimeter) => void;
  updateDosimeter: (id: string, dosimeter: Dosimeter) => void;
  deleteDosimeter: (id: string) => void;
  assignDosimeter: (employeeId: string, dosimeterId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [radiationRecords, setRadiationRecords] = useState<RadiationRecord[]>([]);
  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>([]);
  const [dosimeters, setDosimeters] = useState<Dosimeter[]>([]);

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  const updateEmployee = (id: string, updatedEmployee: Employee) => {
    setEmployees(employees.map(emp => emp.id === id ? updatedEmployee : emp));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const addRadiationRecord = (record: RadiationRecord) => {
    setRadiationRecords([...radiationRecords, record]);
  };

  const addRadiationRecords = (records: RadiationRecord[]) => {
    setRadiationRecords([...radiationRecords, ...records]);
  };

  const addTrainingCourse = (course: TrainingCourse) => {
    setTrainingCourses([...trainingCourses, course]);
  };

  const updateTrainingCourse = (id: string, updatedCourse: TrainingCourse) => {
    setTrainingCourses(trainingCourses.map(course => course.id === id ? updatedCourse : course));
  };

  const deleteTrainingCourse = (id: string) => {
    setTrainingCourses(trainingCourses.filter(course => course.id !== id));
  };

  const addDosimeter = (dosimeter: Dosimeter) => {
    setDosimeters([...dosimeters, dosimeter]);
  };

  const updateDosimeter = (id: string, updatedDosimeter: Dosimeter) => {
    setDosimeters(dosimeters.map(dosimeter => dosimeter.id === id ? updatedDosimeter : dosimeter));
  };

  const deleteDosimeter = (id: string) => {
    setDosimeters(dosimeters.filter(dosimeter => dosimeter.id !== id));
  };

  const assignDosimeter = (employeeId: string, dosimeterId: string) => {
    setDosimeters(dosimeters.map(dosimeter => 
      dosimeter.id === dosimeterId ? { ...dosimeter, assignedTo: employeeId } : dosimeter
    ));
  };

  const value = {
    employees,
    radiationRecords,
    trainingCourses,
    dosimeters,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addRadiationRecord,
    addRadiationRecords,
    addTrainingCourse,
    updateTrainingCourse,
    deleteTrainingCourse,
    addDosimeter,
    updateDosimeter,
    deleteDosimeter,
    assignDosimeter
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};