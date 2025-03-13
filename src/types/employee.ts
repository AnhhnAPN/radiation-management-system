export type Department = 'Phòng Kỹ thuật' | 'Phòng Hành chính' | 'Phòng Kế hoạch' | 'Phòng Tài chính';
export type Position = 'Kỹ sư' | 'Cán bộ' | 'Trưởng phòng' | 'Phó phòng';

export interface Employee {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  positionId: string;
  startDate: string;
} 