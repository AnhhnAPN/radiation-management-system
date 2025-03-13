import React, { useState, useEffect } from 'react';
import { getAllDosimeters, addDosimeter, updateDosimeter, deleteDosimeter, getAllEmployees } from '../services/dataService';
import type { Dosimeter } from '../types/categories';
import type { Employee } from '../types/employee';

const DosimeterManagement: React.FC = () => {
  const [dosimeters, setDosimeters] = useState<Dosimeter[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDosimeter, setCurrentDosimeter] = useState<Dosimeter | null>(null);

  useEffect(() => {
    loadDosimeters();
    loadEmployees();
  }, []);

  const loadDosimeters = () => {
    const data = getAllDosimeters();
    const dosimetersWithNames = data.map(d => ({
      ...d,
      assignedToName: employees.find(e => e.id === d.assignedTo)?.name
    }));
    setDosimeters(dosimetersWithNames);
  };

  const loadEmployees = () => {
    const data = getAllEmployees();
    setEmployees(data);
  };

  const handleOpenModal = (dosimeter: Dosimeter | null = null) => {
    setCurrentDosimeter(dosimeter || {
      id: crypto.randomUUID(),
      code: '',
      name: '',
      serialNumber: '',
      assignedTo: '',
      lastCalibrationDate: '',
      nextCalibrationDate: '',
      status: 'active',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentDosimeter(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentDosimeter) {
      if (dosimeters.some(d => d.id === currentDosimeter.id)) {
        updateDosimeter(currentDosimeter.id, currentDosimeter);
      } else {
        addDosimeter(currentDosimeter);
      }
      loadDosimeters();
      handleCloseModal();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa liều kế này?')) {
      deleteDosimeter(id);
      loadDosimeters();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý Liều kế</h1>
      
      <div className="mb-6">
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm Liều kế Mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Serial</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người Được Gán</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Hiệu Chuẩn Cuối</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Hiệu Chuẩn Tiếp Theo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dosimeters.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Chưa có dữ liệu liều kế
                </td>
              </tr>
            ) : (
              dosimeters.map((dosimeter) => (
                <tr key={dosimeter.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{dosimeter.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dosimeter.assignedToName || 'Chưa gán'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dosimeter.lastCalibrationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dosimeter.nextCalibrationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${dosimeter.status === 'active' ? 'bg-green-100 text-green-800' : 
                        dosimeter.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {dosimeter.status === 'active' ? 'Hoạt động' :
                       dosimeter.status === 'inactive' ? 'Không hoạt động' : 'Bảo trì'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleOpenModal(dosimeter)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDelete(dosimeter.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentDosimeter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">
                {dosimeters.some((d) => d.id === currentDosimeter.id)
                  ? 'Cập nhật thông tin liều kế'
                  : 'Thêm liều kế mới'}
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số Serial
                  </label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={currentDosimeter.serialNumber}
                    onChange={(e) => setCurrentDosimeter({...currentDosimeter, serialNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Người Được Gán
                  </label>
                  <select
                    name="assignedTo"
                    value={currentDosimeter.assignedTo}
                    onChange={(e) => setCurrentDosimeter({...currentDosimeter, assignedTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">-- Chọn nhân viên --</option>
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} - {employee.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày Hiệu Chuẩn Cuối
                  </label>
                  <input
                    type="date"
                    name="lastCalibrationDate"
                    value={currentDosimeter.lastCalibrationDate}
                    onChange={(e) => setCurrentDosimeter({...currentDosimeter, lastCalibrationDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày Hiệu Chuẩn Tiếp Theo
                  </label>
                  <input
                    type="date"
                    name="nextCalibrationDate"
                    value={currentDosimeter.nextCalibrationDate}
                    onChange={(e) => setCurrentDosimeter({...currentDosimeter, nextCalibrationDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng Thái
                  </label>
                  <select
                    name="status"
                    value={currentDosimeter.status}
                    onChange={(e) => setCurrentDosimeter({...currentDosimeter, status: e.target.value as 'active' | 'inactive' | 'maintenance'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                    <option value="maintenance">Bảo trì</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {dosimeters.some((d) => d.id === currentDosimeter.id) ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DosimeterManagement;