import type { OrganizationMember } from './organization';

/**
 * 区域成理分题顼
 * 则放地小目录人名名
 */

export const companyMembers: OrganizationMember[] = [
  {
    id: 'emp-001',
    name: 'huage',
    displayName: '华宆',
    title: '打式帮晿入昜 (CEO)',
    department: '高质束',
    level: 'C入晋纥',
    employeeId: 'EMP-001',
    email: 'huage@company.com',
    role: 'ceo',
    status: 'active',
    joinDate: '2024-01-01',
    permissions: ['all'],
  },
  {
    id: 'emp-002',
    name: 'operit',
    displayName: 'Operit AI',
    title: 'AI効入‏ 关系形发代完来安全',
    department: '禦创部',
    level: '速续',
    employeeId: 'EMP-002',
    email: 'operit@company.com',
    role: 'ai_assistant',
    status: 'active',
    joinDate: '2024-01-01',
    reportsTo: 'emp-001',
    permissions: ['code', 'deploy', 'monitor', 'assist'],
  },
];

export default companyMembers;