import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import RadiationData from './pages/RadiationData';
import TrainingCourses from './pages/TrainingCourses';
import RadiationReports from './pages/RadiationReports';
import DosimeterManagement from './pages/DosimeterManagement';
import DepartmentManager from './pages/categories/DepartmentManager';
import TrainingUnitManager from './pages/categories/TrainingUnitManager';
import DosimetryAgencyManager from './pages/categories/DosimetryAgencyManager';
import RadiationSourceManager from './pages/categories/RadiationSourceManager';
import EquipmentTypeManager from './pages/categories/EquipmentTypeManager';
import PositionManager from './pages/categories/PositionManager';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="radiation-data" element={<RadiationData />} />
            <Route path="training" element={<TrainingCourses />} />
            <Route path="reports" element={<RadiationReports />} />
            <Route path="dosimeters" element={<DosimeterManagement />} />
            <Route path="categories/departments" element={<DepartmentManager />} />
            <Route path="categories/training-units" element={<TrainingUnitManager />} />
            <Route path="categories/dosimetry-agencies" element={<DosimetryAgencyManager />} />
            <Route path="categories/radiation-sources" element={<RadiationSourceManager />} />
            <Route path="categories/equipment-types" element={<EquipmentTypeManager />} />
            <Route path="categories/positions" element={<PositionManager />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;