import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Activity,
  GraduationCap,
  FileText,
  Gauge,
  ChevronDown,
  ChevronRight,
  Building2,
  School,
  Building,
  Atom,
  Cpu,
  UserRound
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Tự động mở menu danh mục khi đang ở trang danh mục
  useEffect(() => {
    if (location.pathname.startsWith('/categories')) {
      setIsCategoryOpen(true);
    }
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isInCategory = () => {
    return location.pathname.startsWith('/categories');
  };

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Tổng quan' },
    { path: '/employees', icon: Users, label: 'Quản lý Nhân viên' },
    { path: '/radiation-data', icon: Activity, label: 'Dữ liệu Bức xạ' },
    { path: '/training', icon: GraduationCap, label: 'Đào tạo An toàn' },
    { path: '/reports', icon: FileText, label: 'Báo cáo' },
    { path: '/dosimeters', icon: Gauge, label: 'Quản lý Liều kế' },
  ];

  const categoryItems = [
    { path: '/categories/departments', icon: Building2, label: 'Phòng ban' },
    { path: '/categories/training-units', icon: School, label: 'Đơn vị Đào tạo' },
    { path: '/categories/dosimetry-agencies', icon: Building, label: 'Cơ quan Đo liều' },
    { path: '/categories/radiation-sources', icon: Atom, label: 'Nguồn phóng xạ' },
    { path: '/categories/equipment-types', icon: Cpu, label: 'Loại thiết bị' },
    { path: '/categories/positions', icon: UserRound, label: 'Chức vụ' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý ATBX</h1>
      </div>
      <nav className="mt-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              isActive(item.path) ? 'bg-indigo-50 text-indigo-600' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="mt-4">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              isInCategory() ? 'bg-indigo-50 text-indigo-600' : ''
            }`}
          >
            <span className="flex-1 flex items-center">
              <Building2 className="w-5 h-5 mr-3" />
              <span>Danh mục</span>
            </span>
            {isCategoryOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          <div className={`bg-gray-50 ${isCategoryOpen ? 'block' : 'hidden'}`}>
            {categoryItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-2 pl-12 text-gray-700 hover:bg-gray-100 ${
                  isActive(item.path) ? 'bg-indigo-50 text-indigo-600' : ''
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;