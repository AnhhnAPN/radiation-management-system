import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, Activity, BookOpen, Cpu, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { employees, radiationRecords, trainingCourses, dosimeters } = useAppContext();

  // Calculate statistics
  const assignedDosimeters = dosimeters.filter(d => d.status === 'assigned').length;
  const upcomingTrainings = trainingCourses.filter(c => c.status === 'scheduled').length;
  
  // Find high radiation readings (above 5 mSv for example)
  const highRadiationReadings = radiationRecords.filter(r => r.dosimeterReading > 5).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
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
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Activity size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Bản ghi bức xạ</h2>
              <p className="text-2xl font-semibold">{radiationRecords.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <BookOpen size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Khóa đào tạo</h2>
              <p className="text-2xl font-semibold">{trainingCourses.length}</p>
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
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Khóa đào tạo sắp tới</h3>
          </div>
          <div className="p-6">
            {trainingCourses.length > 0 ? (
              <div className="space-y-4">
                {trainingCourses
                  .filter(course => course.status === 'scheduled')
                  .slice(0, 3)
                  .map(course => (
                    <div key={course.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{course.name}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {course.participants.length} học viên
                      </span>
                    </div>
                  ))}
                {upcomingTrainings === 0 && (
                  <p className="text-gray-500 text-center py-4">Không có khóa đào tạo nào sắp tới</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Chưa có khóa đào tạo nào</p>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Cảnh báo bức xạ cao</h3>
          </div>
          <div className="p-6">
            {radiationRecords.length > 0 ? (
              <div className="space-y-4">
                {radiationRecords
                  .filter(record => record.dosimeterReading > 5)
                  .slice(0, 3)
                  .map(record => {
                    const employee = employees.find(e => e.id === record.employeeId);
                    return (
                      <div key={record.id} className="flex items-center">
                        <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
                          <AlertTriangle size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium">{employee?.name || 'Unknown'}</h4>
                          <p className="text-sm text-gray-500">
                            {record.dosimeterReading} mSv - {new Date(record.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                {highRadiationReadings === 0 && (
                  <p className="text-gray-500 text-center py-4">Không có cảnh báo bức xạ cao</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Chưa có dữ liệu bức xạ</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;