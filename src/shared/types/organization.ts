/**
 * 组织架构类型定义
 * 支持自定义部门和层级
 */

export type DepartmentLevel = 
  | 'executive'
  | 'director'
  | 'manager'
  | 'senior'
  | 'junior'
  | 'intern';

export type DepartmentType =
  | 'executive'
  | 'rd'
  | 'product'
  | 'marketing'
  | 'sales'
  | 'finance'
  | 'accounting'
  | 'legal'
  | 'hr'
  | 'operations'
  | 'custom';

export interface Department {
  id: string;
  type: DepartmentType;
  name: string;
  nameKey?: string;
  icon: string;
  gradient: string;
  parentDepartmentId?: string;
  level: number;
  description?: string;
  custom?: boolean;
  members?: string[];
}

export interface JobLevel {
  id: string;
  name: string;
  nameKey?: string;
  level: number;
  icon: string;
  color: string;
  permissions: string[];
}

export interface OrganizationMember {
  memberId: string;
  departmentId: string;
  departmentType: DepartmentType;
  jobLevelId: string;
  title: string;
  titleKey?: string;
  reportsTo?: string;
  joinDate?: number;
  employeeId?: string;
}

export interface OrganizationConfig {
  id: string;
  name: string;
  departments: Department[];
  jobLevels: JobLevel[];
  members: OrganizationMember[];
  createdAt: number;
  updatedAt: number;
}

export interface ZeroClawInstance {
  id: string;
  name: string;
  departmentId: string;
  jobLevelId: string;
  title: string;
  port: number;
  configPath: string;
  avatar: string;
  description?: string;
}
