import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Upload, Download, Search, Filter } from 'lucide-react';
import * as XLSX from 'xlsx';

const RadiationData: React.FC = () => {
  const { employees, radiationRecords, addRadiationRecords } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{
    isImporting: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | null;
  }>({
    isImporting: false,
    message: '',
    type: null,
  });

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus({
      isImporting: true,
      message: 'Đang nhập dữ liệu...',
      type: 'info',
    });

    try {
      const data = await readExcelFile(file);
      if (data && data.length > 0) {
        const newRecords = data.map((row: any) => {
          const employeeId = findEmployeeIdByEmployeeCode(row['Mã nhân viên'] || '');
          
          return {
            id: crypto.randomUUID(),
            employeeId,
            date: formatExcelDate(row['Ngày đo'] || new Date()),
            dosimeterReading: parseFloat(row['Chỉ số bức xạ (mSv)'] || 0),
            location: row['Vị trí đo'] || '',
            radiationType: row['Loại bức xạ'] || '',
            notes: row['Ghi chú'] || '',
          };
        });

        addRadiationRecords(newRecords);
        
        setImportStatus({
          isImporting: false,
          message: `Đã nhập thành công ${newRecords.length} bản ghi`,
          type: 'success',
        });
      } else {
        setImportStatus({
          isImporting: false,
          message: 'Không có dữ liệu để nhập',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error importing data:', error);
      setImportStatus({
        isImporting: false,
        message: 'Lỗi khi nhập dữ liệu. Vui lòng kiểm tra định dạng file.',
        type: 'error',
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const readExcelFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  };

  const formatExcelDate = (dateValue: any): string => {
    let date;
    if (typeof dateValue === 'number') {
      // Excel date number
      date = new Date(Math.round((dateValue - 25569) * 86400 * 1000));
    } else if (dateValue instanceof Date) {
      date = dateValue;
    } else {
      try {
        date = new Date(dateValue);
      } catch (e) {
        date = new Date();
      }
    }
    
    return date.toISOString().split('T')[0];
  };

  const findEmployeeIdByEmployeeCode = (employeeCode: string): string => {
    const employee = employees.find(emp => emp.employeeId === employeeCode);
    return employee ? employee.id : '';
  };

  const getEmployeeName = (employeeId: string): string => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  const getEmployeeDepartment = (employeeId: string): string => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.department : '';
  };

  const exportToExcel = () => {
    const dataToExport = radiationRecords.map(record => ({
      'Họ tên': getEmployeeName(record.employeeId),
      'Mã nhân viên': employees.find(emp => emp.id === record.employeeId)?.employeeId || '',
      'Phòng ban': getEmployeeDepartment(record.employeeId),
      'Ngày đo': new Date(record.date).toLocaleDateString(),
      'Chỉ số bức xạ (mSv)': record.dosimeterReading,
      'Vị trí đo': record.location,
      'Loại bức xạ': record.radiationType,
      'Ghi chú': record.notes || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Radiation Data');
    XLSX.writeFile(workbook, 'radiation_data.xlsx');
  };

  // Get unique departments for filtering
  const departments = [...new Set(employees.map(emp => emp.department))];

  // Filter records based on search term and department filter
  const filteredRecords = radiationRecords.filter(record => {
    const employeeName = getEmployeeName(record.employeeId).toLowerCase();
    const employeeCode = employees.find(emp => emp.id === record.employeeId)?.employeeId.toLowerCase() || '';
    const department = getEmployeeDepartment(record.employeeId);
    
    const matchesSearch = 
      employeeName.includes(searchTerm.toLowerCase()) || 
      employeeCode.includes(searchTerm.toLowerCase()) ||
      record.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === '' || department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý chỉ số bức xạ</h1>
        <div className="flex space-x-3">
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
            disabled={radiationRecords.length === 0}
          >
            <Download size={18} className="mr-1" />
            Xuất Excel
          </button>
          <button
            onClick={handleImportClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Upload size={18} className="mr-1" />
            Nhập Excel
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx, .xls"
            className="hidden"
          />
        </div>
      </div>

      {importStatus.message && (
        <div
          className={`p-4 rounded-md ${
            importStatus.type === 'success'
              ? 'bg-green-50 text-green-800'
              : importStatus.type === 'error'
              ? 'bg-red-50 text-red-800'
              : 'bg-blue-50 text-blue-800'
          }`}
        >
          {importStatus.message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center rounded-md bg-gray-100 px-3 py-2 flex-1">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã nhân viên, vị trí..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="">Tất cả phòng ban</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã NV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phòng ban
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chỉ số (mSv)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vị trí đo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại bức xạ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => {
                  const employee = employees.find(emp => emp.id === record.employeeId);
                  return (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {getEmployeeName(record.employeeId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee?.employeeId || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getEmployeeDepartment(record.employeeId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            record.dosimeterReading > 5
                              ? 'bg-red-100 text-red-800'
                              : record.dosimeterReading > 2
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {record.dosimeterReading}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.radiationType}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    {radiationRecords.length === 0
                      ? 'Chưa có dữ liệu bức xạ. Vui lòng nhập dữ liệu từ file Excel.'
                      : 'Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RadiationData;