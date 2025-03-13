import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, Activity, BookOpen, Cpu, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { employees, dosimeters } = useAppContext();

  // Tính toán thống kê
  const assignedDosimeters = dosimeters.filter(d => d.assignedTo !== '').length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Tổng nhân viên</h2>
              <p className="text-2xl font-semibold">{employees.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Cpu size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Liều kế đã cấp</h2>
              <p className="text-2xl font-semibold">{assignedDosimeters} / {dosimeters.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Activity size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Liều kế hoạt động</h2>
              <p className="text-2xl font-semibold">
                {dosimeters.filter(d => d.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <AlertTriangle size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Liều kế bảo trì</h2>
              <p className="text-2xl font-semibold">
                {dosimeters.filter(d => d.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Liều kế sắp hết hạn hiệu chuẩn</h3>
          </div>
          <div className="p-6">
            {dosimeters.length > 0 ? (
              <div className="space-y-4">
                {dosimeters
                  .filter(d => {
                    const nextCalibration = new Date(d.nextCalibrationDate);
                    const today = new Date();
                    const diffDays = Math.ceil((nextCalibration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    return diffDays <= 30 && diffDays > 0;
                  })
                  .slice(0, 3)
                  .map(dosimeter => {
                    const employee = employees.find(e => e.id === dosimeter.assignedTo);
                    return (
                      <div key={dosimeter.id} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{dosimeter.serialNumber}</h4>
                          <p className="text-sm text-gray-500">
                            Người được gán: {employee?.name || 'Chưa gán'}
                          </p>
                        </div>
                        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                          {dosimeter.nextCalibrationDate}
                        </span>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Chưa có dữ liệu liều kế</p>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Liều kế đang bảo trì</h3>
          </div>
          <div className="p-6">
            {dosimeters.length > 0 ? (
              <div className="space-y-4">
                {dosimeters
                  .filter(d => d.status === 'maintenance')
                  .slice(0, 3)
                  .map(dosimeter => {
                    const employee = employees.find(e => e.id === dosimeter.assignedTo);
                    return (
                      <div key={dosimeter.id} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{dosimeter.serialNumber}</h4>
                          <p className="text-sm text-gray-500">
                            Người được gán: {employee?.name || 'Chưa gán'}
                          </p>
                        </div>
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          Đang bảo trì
                        </span>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Chưa có dữ liệu liều kế</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;