import XLSX from 'xlsx';

const sampleData = [
  {
    'Họ tên': 'Nguyễn Văn A',
    'Mã NV': 'NV001',
    'Phòng ban': 'Phòng Kỹ thuật',
    'Chức vụ': 'Kỹ sư',
    'Ngày sinh': '1990-01-15',
    'Ngày vào làm': '2020-03-01',
    'Liên hệ': '0123456789'
  },
  {
    'Họ tên': 'Trần Thị B',
    'Mã NV': 'NV002',
    'Phòng ban': 'Phòng Nhân sự',
    'Chức vụ': 'Chuyên viên',
    'Ngày sinh': '1992-05-20',
    'Ngày vào làm': '2021-01-15',
    'Liên hệ': '0987654321'
  },
  {
    'Họ tên': 'Lê Văn C',
    'Mã NV': 'NV003',
    'Phòng ban': 'Phòng Kế toán',
    'Chức vụ': 'Kế toán viên',
    'Ngày sinh': '1988-08-10',
    'Ngày vào làm': '2019-06-01',
    'Liên hệ': '0369852147'
  }
];

const ws = XLSX.utils.json_to_sheet(sampleData);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Danh sách nhân viên');
XLSX.writeFile(wb, 'danh-sach-nhan-vien.xlsx');

console.log('Đã tạo file Excel mẫu thành công!'); 