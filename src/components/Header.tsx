import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center rounded-md bg-gray-100 px-3 py-2 w-64">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;