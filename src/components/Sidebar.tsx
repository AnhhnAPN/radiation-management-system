import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Users,
  Activity,
  FileText,
  BookOpen,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors relative ${
      isActive ? 'bg-indigo-50 text-indigo-600' : ''
    }`;

  const renderTooltip = (text: string) => {
    if (!isOpen && hoveredItem === text) {
      return (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap z-50">
          {text}
        </div>
      );
    }
    return null;
  };

  return (
    <aside
      className={`bg-white shadow-sm transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } flex flex-col fixed h-screen z-30`}
    >
      <div className="p-4">
        <h1 className={`font-bold text-xl text-gray-800 ${!isOpen && 'hidden'}`}>
          Quản lý bức xạ
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <div className="px-2 space-y-1">
          <NavLink 
            to="/" 
            className={navLinkClass} 
            end
            onMouseEnter={() => setHoveredItem('Trang chủ')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Home size={20} />
            {isOpen && <span className="ml-3">Trang chủ</span>}
            {renderTooltip('Trang chủ')}
          </NavLink>

          <NavLink 
            to="/employees" 
            className={navLinkClass}
            onMouseEnter={() => setHoveredItem('Nhân viên')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Users size={20} />
            {isOpen && <span className="ml-3">Nhân viên</span>}
            {renderTooltip('Nhân viên')}
          </NavLink>

          <NavLink 
            to="/dosimeters" 
            className={navLinkClass}
            onMouseEnter={() => setHoveredItem('Liều kế')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Activity size={20} />
            {isOpen && <span className="ml-3">Liều kế</span>}
            {renderTooltip('Liều kế')}
          </NavLink>

          <NavLink 
            to="/radiation-data" 
            className={navLinkClass}
            onMouseEnter={() => setHoveredItem('Dữ liệu bức xạ')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <FileText size={20} />
            {isOpen && <span className="ml-3">Dữ liệu bức xạ</span>}
            {renderTooltip('Dữ liệu bức xạ')}
          </NavLink>

          <NavLink 
            to="/training" 
            className={navLinkClass}
            onMouseEnter={() => setHoveredItem('Đào tạo')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <BookOpen size={20} />
            {isOpen && <span className="ml-3">Đào tạo</span>}
            {renderTooltip('Đào tạo')}
          </NavLink>

          {user?.role === 'admin' && (
            <div>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`w-full flex items-center px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors relative ${
                  isCategoryOpen ? 'bg-indigo-50 text-indigo-600' : ''
                }`}
                onMouseEnter={() => setHoveredItem('Danh mục')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Settings size={20} />
                {isOpen && (
                  <>
                    <span className="ml-3">Danh mục</span>
                    <span className="ml-auto">
                      {isCategoryOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  </>
                )}
                {renderTooltip('Danh mục')}
              </button>

              {isOpen && isCategoryOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  <NavLink
                    to="/categories/departments"
                    className={navLinkClass}
                  >
                    <span className="ml-7">Phòng ban</span>
                  </NavLink>
                  <NavLink
                    to="/categories/positions"
                    className={navLinkClass}
                  >
                    <span className="ml-7">Chức vụ</span>
                  </NavLink>
                  <NavLink
                    to="/categories/training-units"
                    className={navLinkClass}
                  >
                    <span className="ml-7">Đơn vị đào tạo</span>
                  </NavLink>
                  <NavLink
                    to="/categories/dosimetry-agencies"
                    className={navLinkClass}
                  >
                    <span className="ml-7">Cơ quan đo liều</span>
                  </NavLink>
                  <NavLink
                    to="/categories/radiation-sources"
                    className={navLinkClass}
                  >
                    <span className="ml-7">Nguồn phóng xạ</span>
                  </NavLink>
                  <NavLink
                    to="/categories/equipment-types"
                    className={navLinkClass}
                  >
                    <span className="ml-7">Loại thiết bị</span>
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;