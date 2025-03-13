import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import DosimeterManagement from './pages/DosimeterManagement';
import RadiationData from './pages/RadiationData';
import RadiationReports from './pages/RadiationReports';
import TrainingCourses from './pages/TrainingCourses';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';
import DepartmentManager from './pages/categories/DepartmentManager';
import TrainingUnitManager from './pages/categories/TrainingUnitManager';
import DosimetryAgencyManager from './pages/categories/DosimetryAgencyManager';
import RadiationSourceManager from './pages/categories/RadiationSourceManager';
import EquipmentTypeManager from './pages/categories/EquipmentTypeManager';
import PositionManager from './pages/categories/PositionManager';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<EmployeeList />} />
              <Route path="dosimeters" element={<DosimeterManagement />} />
              <Route path="radiation-data" element={<RadiationData />} />
              <Route path="reports" element={<RadiationReports />} />
              <Route path="training" element={<TrainingCourses />} />
              <Route path="profile" element={<Profile />} />
              <Route path="categories/departments" element={<DepartmentManager />} />
              <Route path="categories/training-units" element={<TrainingUnitManager />} />
              <Route path="categories/dosimetry-agencies" element={<DosimetryAgencyManager />} />
              <Route path="categories/radiation-sources" element={<RadiationSourceManager />} />
              <Route path="categories/equipment-types" element={<EquipmentTypeManager />} />
              <Route path="categories/positions" element={<PositionManager />} />
            </Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;