import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Printer, FileText, Calendar, User } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const RadiationReports: React.FC = () => {
  const { employees, radiationRecords } = useAppContext();
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    
    // Get the selected employee
    const employee = employees.find(emp => emp.id === selectedEmployee);
    
    if (!employee) {
      alert('Vui lòng chọn nhân viên');
      return;
    }
    
    // Filter records by employee and date range
    const filteredRecords = radiationRecords.filter(record => {
      const recordDate = new Date(record.date);
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();
      
      return (
        record.employeeId === selectedEmployee &&
        recordDate >= start &&
        recordDate <= end
      );
    });
    
    if (filteredRecords.length === 0) {
      alert('Không có dữ liệu bức xạ trong khoảng thời gian đã chọn');
      return;
    }
    
    // Add title
    doc.setFontSize(18);
    doc.text('SỔ THEO DÕI CHỈ SỐ BỨC XẠ', 105, 20, { align: 'center' });
    
    // Add employee information
    doc.setFontSize(12);
    doc.text(`Họ tên: ${employee.name}`, 14, 40);
    doc.text(`Mã nhân viên: ${employee.employeeId}`, 14, 48);
    doc.text(`Phòng ban: ${employee.department}`, 14, 56);
    doc.text(`Chức vụ: ${employee.position}`, 14, 64);
    
    // Add date range
    doc.text(`Từ ngày: ${startDate ? new Date(startDate).toLocaleDateString() : 'Tất cả'}`, 14, 72);
    doc.text(`Đến ngày: ${endDate ? new Date(endDate).toLocaleDateString() : 'Tất cả'}`, 14, 80);
    
    // Add table
    const tableColumn = ['STT', 'Ngày đo', 'Chỉ số (mSv)', 'Vị trí đo', 'Loại bức xạ', 'Ghi chú'];
    const tableRows = filteredRecords.map((record, index) => [
      index + 1,
      new Date(record.date).toLocaleDateString(),
      record.dosimeterReading,
      record.location,
      record.radiationType,
      record.notes || ''
    ]);
    
    // @ts-ignore
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 90,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [66, 66, 66] }
    });
    
    // Add signature section
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    
    doc.text('Người lập báo cáo', 50, finalY, { align: 'center' });
    doc.text('Người phê duyệt', 150, finalY, { align: 'center' });
    
    // Save the PDF
    doc.save(`radiation_report_${employee.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">In sổ theo dõi chỉ số bức xạ</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <User className="mr-2" size={20} />
              Thông tin nhân viên
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chọn nhân viên
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">-- Chọn nhân viên --</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} ({employee.employeeId})
                    </option>
                  ))}
                </select>
              </div>

              {selectedEmployee && (
                <div className="bg-gray-50 p-4 rounded-md">
                  {(() => {
                    const employee = employees.find(emp => emp.id === selectedEmployee);
                    if (!employee) return null;
                    
                    return (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Họ tên:</p>
                            <p className="font-medium">{employee.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Mã nhân viên:</p>
                            <p className="font-medium">{employee.employeeId}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phòng ban:</p>
                            <p className="font-medium">{employee.department}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Chức vụ:</p>
                            <p className="font-medium">{employee.position}</p>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Calendar className="mr-2" size={20} />
              Khoảng thời gian
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Từ ngày
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Đến ngày
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={generatePDF}
            disabled={!selectedEmployee}
            className={`flex items-center px-6 py-3 rounded-md ${
              !selectedEmployee
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Printer className="mr-2" size={20} />
            In sổ theo dõi
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium flex items-center">
            <FileText className="mr-2" size={20} />
            Xem trước dữ liệu
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ghi chú
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedEmployee ? (
                (() => {
                  // Filter records by employee and date range
                  const filteredRecords = radiationRecords.filter(record => {
                    const recordDate = new Date(record.date);
                    const start = startDate ? new Date(startDate) : new Date(0);
                    const end = endDate ? new Date(endDate) : new Date();
                    
                    return (
                      record.employeeId === selectedEmployee &&
                      recordDate >= start &&
                      recordDate <= end
                    );
                  });

                  if (filteredRecords.length === 0) {
                    return (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          Không có dữ liệu bức xạ trong khoảng thời gian đã chọn
                        </td>
                      </tr>
                    );
                  }

                  return filteredRecords.map((record, index) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.notes || '-'}
                      </td>
                    </tr>
                  ));
                })()
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    Vui lòng chọn nhân viên để xem dữ liệu
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

export default RadiationReports;