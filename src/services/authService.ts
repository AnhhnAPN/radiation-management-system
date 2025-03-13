import { dataService } from './dataService';
import type { User } from './dataService';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
}

export interface UpdateProfileData {
  fullName?: string;
  email?: string;
}

const USER_KEY = 'radiation_management_user';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    try {
      const user = dataService.login(credentials.username, credentials.password);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác');
    }
  },

  logout: () => {
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  register: async (data: RegisterData): Promise<void> => {
    if (data.password !== data.confirmPassword) {
      throw new Error('Mật khẩu xác nhận không khớp');
    }

    // Trong phiên bản demo này, chúng ta không thực sự tạo người dùng mới
    throw new Error('Chức năng đăng ký chưa được hỗ trợ');
  },

  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Không tìm thấy thông tin người dùng');
    }

    dataService.updateUserProfile(currentUser.id, data);
    const updatedUser = dataService.getUserById(currentUser.id);
    if (!updatedUser) {
      throw new Error('Không tìm thấy thông tin người dùng');
    }

    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Không tìm thấy thông tin người dùng');
    }

    dataService.changePassword(currentUser.id, currentPassword, newPassword);
  }
}; 