import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Edit, Trash2, Search, Users } from 'lucide-react';

interface TrainingFormData {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  instructor: string;
  participants: string[];
  status: 'scheduled' | 'in-progress' | 'completed';
}

const TrainingCourses: React.FC = () => {
  const { employees, trainingCourses, addTrainingCourse, updateTrainingCourse, deleteTrainingCourse } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<TrainingFormData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const handleOpenModal = (course: TrainingFormData | null = null) => {
    setCurrentCourse(course || {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      instructor: '',
      participants: [],
      status: 'scheduled',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCourse(null);
  };

  const handleOpenParticipantModal = (course: TrainingFormData) => {
    setCurrentCourse(course);
    setIsParticipantModalOpen(true);
  };

  const handleCloseParticipantModal = () => {
    setIsParticipantModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCourse) {
      if (trainingCourses.some(course => course.id === currentCourse.id)) {
        updateTrainingCourse(currentCourse.id, currentCourse);
      } else {
        addTrainingCourse(currentCourse);
      }
      handleCloseModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentCourse) {
      setCurrentCourse({
        ...currentCourse,
        [name]: value,
      });
    }
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khóa đào tạo này?')) {
      deleteTrainingCourse(id);
    }
  };

  const handleParticipantChange = (employeeId: string) => {
    if (!currentCourse) return;
    
    const isSelected = currentCourse.participants.includes(employeeId);
    let updatedParticipants;
    
    if (isSelected) {
      updatedParticipants = currentCourse.participants.filter(id => id !== employeeId);
    } else {
      updatedParticipants = [...currentCourse.participants, employeeId];
    }
    
    setCurrentCourse({
      ...currentCourse,
      participants: updatedParticipants,
    });
  };

  const handleSaveParticipants = () => {
    if (currentCourse) {
      updateTrainingCourse(currentCourse.id, currentCourse);
      handleCloseParticipantModal();
    }
  };

  const filteredCourses = trainingCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || course.status === statusFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý khóa đào tạo</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Thêm khóa đào tạo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center rounded-md bg-gray-100 px-3 py-2 flex-1">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa đào tạo..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="scheduled">Đã lên lịch</option>
              <option value="in-progress">Đang diễn ra</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên khóa đào tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giảng viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{course.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.instructor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleOpenParticipantModal(course)}
                        className="flex items-center text-indigo-600 hover:text-indigo-900"
                      >
                        <Users size={16} className="mr-1" />
                        {course.participants.length} học viên
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          course.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : course.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {course.status === 'completed'
                          ? 'Đã hoàn thành'
                          : course.status === 'in-progress'
                          ? 'Đang diễn ra'
                          : 'Đã lên lịch'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenModal(course)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    Không tìm thấy khóa đào tạo nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && currentCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">
                {trainingCourses.some((course) => course.id === currentCourse.id)
                  ? 'Cập nhật khóa đào tạo'
                  : 'Thêm khóa đào tạo mới'}
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên khóa đào tạo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentCourse.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    name="description"
                    value={currentCourse.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày bắt đầu
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={currentCourse.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày kết thúc
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={currentCourse.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giảng viên
                  </label>
                  <input
                    type="text"
                    name="instructor"
                    value={currentCourse.instructor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={currentCourse.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="scheduled">Đã lên lịch</option>
                    <option value="in-progress">Đang diễn ra</option>
                    <option value="completed">Đã hoàn thành</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  {trainingCourses.some((course) => course.id === currentCourse.id) ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isParticipantModalOpen && currentCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Quản lý học viên - {currentCourse.name}</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center rounded-md bg-gray-100 px-3 py-2">
                  <Search size={18} className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm nhân viên..."
                    className="bg-transparent border-none outline-none text-sm w-full"
                  />
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chọn
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã NV
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Họ tên
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phòng ban
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={currentCourse.participants.includes(employee.id)}
                            onChange={() => handleParticipantChange(employee.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.employeeId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.department}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Đã chọn {currentCourse.participants.length} học viên
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCloseParticipantModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveParticipants}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Lưu danh sách
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCourses;