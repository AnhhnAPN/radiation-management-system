import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface CategoryItem {
  id: string;
  code: string;
  name: string;
  [key: string]: any;
}

interface CategoryManagerProps {
  title: string;
  items: CategoryItem[];
  fields: {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'date';
    required?: boolean;
  }[];
  onAdd: (item: CategoryItem) => void;
  onUpdate: (id: string, item: CategoryItem) => void;
  onDelete: (id: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  title,
  items,
  fields,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<CategoryItem | null>(null);

  const handleOpenModal = (item: CategoryItem | null = null) => {
    setCurrentItem(item || {
      id: crypto.randomUUID(),
      code: '',
      name: '',
      ...fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {})
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      if (items.some(item => item.id === currentItem.id)) {
        onUpdate(currentItem.id, currentItem);
      } else {
        onAdd(currentItem);
      }
      handleCloseModal();
    }
  };

  const handleInputChange = (key: string, value: string) => {
    if (currentItem) {
      setCurrentItem({
        ...currentItem,
        [key]: value
      });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này?')) {
      onDelete(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Thêm mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên
              </th>
              {fields.map(field => (
                field.key !== 'code' && field.key !== 'name' && (
                  <th key={field.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {field.label}
                  </th>
                )
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  {fields.map(field => (
                    field.key !== 'code' && field.key !== 'name' && (
                      <td key={field.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item[field.key]}
                      </td>
                    )
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
                <td colSpan={fields.length + 2} className="px-6 py-4 text-center text-sm text-gray-500">
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">
                {items.some((item) => item.id === currentItem.id)
                  ? 'Cập nhật thông tin'
                  : 'Thêm mới'}
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã
                  </label>
                  <input
                    type="text"
                    value={currentItem.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên
                  </label>
                  <input
                    type="text"
                    value={currentItem.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                {fields.map(field => (
                  field.key !== 'code' && field.key !== 'name' && (
                    <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={currentItem[field.key]}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required={field.required}
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={currentItem[field.key]}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required={field.required}
                        />
                      )}
                    </div>
                  )
                ))}
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
                  {items.some((item) => item.id === currentItem.id) ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager; 