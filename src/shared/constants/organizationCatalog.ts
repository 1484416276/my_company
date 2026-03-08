/**
 * 组织架构配置常量
 * 部门和职级的默认配置
 */

import type { Department, JobLevel, ZeroClawInstance } from '@/shared/types/organization';

// 默认部门配置
export const DEFAULT_DEPARTMENTS: Department[] = [
  {
    id: 'executive',
    type: 'executive',
    name: '高管层',
    nameKey: 'organization.departments.executive',
    icon: 'business_center',
    gradient: 'from-amber-500 to-orange-500',
    level: 0,
    description: '公司最高管理层',
    members: ['owner']
  },
  {
    id: 'rd',
    type: 'rd',
    name: '研发部',
    nameKey: 'organization.departments.rd',
    icon: 'code',
    gradient: 'from-blue-500 to-cyan-400',
    level: 1,
    description: '产品研发与技术支持',
    members: ['assistant']
  },
  {
    id: 'product',
    type: 'product',
    name: '产品部',
    nameKey: 'organization.departments.product',
    icon: 'lightbulb',
    gradient: 'from-purple-500 to-pink-400',
    level: 1,
    description: '产品规划与设计'
  },
  {
    id: 'marketing',
    type: 'marketing',
    name: '营销部',
    nameKey: 'organization.departments.marketing',
    icon: 'campaign',
    gradient: 'from-green-500 to-emerald-400',
    level: 1,
    description: '市场推广与品牌建设'
  },
  {
    id: 'sales',
    type: 'sales',
    name: '销售部',
    nameKey: 'organization.departments.sales',
    icon: 'trending_up',
    gradient: 'from-red-500 to-rose-400',
    level: 1,
    description: '销售与客户关系'
  },
  {
    id: 'finance',
    type: 'finance',
    name: '财务部',
    nameKey: 'organization.departments.finance',
    icon: 'account_balance',
    gradient: 'from-yellow-500 to-amber-400',
    level: 1,
    description: '财务管理与资金运作'
  },
  {
    id: 'accounting',
    type: 'accounting',
    name: '会计部',
    nameKey: 'organization.departments.accounting',
    icon: 'calculate',
    gradient: 'from-teal-500 to-cyan-400',
    level: 1,
    description: '账务处理与报表'
  },
  {
    id: 'legal',
    type: 'legal',
    name: '法务部',
    nameKey: 'organization.departments.legal',
    icon: 'gavel',
    gradient: 'from-indigo-500 to-violet-400',
    level: 1,
    description: '法律事务与合规'
  },
  {
    id: 'hr',
    type: 'hr',
    name: '人力资源部',
    nameKey: 'organization.departments.hr',
    icon: 'groups',
    gradient: 'from-pink-500 to-rose-400',
    level: 1,
    description: '人力资源管理与招聘'
  },
  {
    id: 'operations',
    type: 'operations',
    name: '运营部',
    nameKey: 'organization.departments.operations',
    icon: 'settings',
    gradient: 'from-gray-500 to-slate-400',
    level: 1,
    description: '日常运营与流程管理'
  }
];

// 默认职级配置
export const DEFAULT_JOB_LEVELS: JobLevel[] = [
  {
    id: 'c-level',
    name: 'C级高管',
    nameKey: 'organization.jobLevels.cLevel',
    level: 100,
    icon: 'stars',
    color: 'text-amber-500',
    permissions: ['all']
  },
  {
    id: 'vp',
    name: '副总裁',
    nameKey: 'organization.jobLevels.vp',
    level: 90,
    icon: 'military_tech',
    color: 'text-orange-500',
    permissions: ['manage_department', 'hire', 'budget']
  },
  {
    id: 'director',
    name: '总监',
    nameKey: 'organization.jobLevels.director',
    level: 80,
    icon: 'badge',
    color: 'text-purple-500',
    permissions: ['manage_team', 'hire', 'budget_limited']
  },
  {
    id: 'manager',
    name: '经理',
    nameKey: 'organization.jobLevels.manager',
    level: 70,
    icon: 'supervisor_account',
    color: 'text-blue-500',
    permissions: ['manage_team', 'assign_tasks']
  },
  {
    id: 'senior',
    name: '高级',
    nameKey: 'organization.jobLevels.senior',
    level: 50,
    icon: 'workspace_premium',
    color: 'text-green-500',
    permissions: ['create', 'edit', 'delete_own']
  },
  {
    id: 'junior',
    name: '初级',
    nameKey: 'organization.jobLevels.junior',
    level: 30,
    icon: 'person',
    color: 'text-cyan-500',
    permissions: ['view', 'create', 'edit_own']
  },
  {
    id: 'intern',
    name: '实习生',
    nameKey: 'organization.jobLevels.intern',
    level: 10,
    icon: 'school',
    color: 'text-gray-500',
    permissions: ['view', 'create']
  }
];

// 预制 ZeroClaw 实例角色
export const PRESET_ZEROCLAW_INSTANCES: ZeroClawInstance[] = [
  {
    id: 'ceo',
    name: 'CEO',
    departmentId: 'executive',
    jobLevelId: 'c-level',
    title: '首席执行官',
    port: 3001,
    configPath: '~/.zeroclaw/config-ceo.json',
    avatar: '👔',
    description: '公司最高决策者'
  },
  {
    id: 'cto',
    name: 'CTO',
    departmentId: 'rd',
    jobLevelId: 'c-level',
    title: '首席技术官',
    port: 3002,
    configPath: '~/.zeroclaw/config-cto.json',
    avatar: '💻',
    description: '技术部门负责人'
  },
  {
    id: 'cfo',
    name: 'CFO',
    departmentId: 'finance',
    jobLevelId: 'c-level',
    title: '首席财务官',
    port: 3003,
    configPath: '~/.zeroclaw/config-cfo.json',
    avatar: '💰',
    description: '财务部门负责人'
  },
  {
    id: 'product-director',
    name: '产品总监',
    departmentId: 'product',
    jobLevelId: 'director',
    title: '产品总监',
    port: 3004,
    configPath: '~/.zeroclaw/config-product.json',
    avatar: '📱',
    description: '产品部门负责人'
  },
  {
    id: 'rd-lead',
    name: '研发主管',
    departmentId: 'rd',
    jobLevelId: 'manager',
    title: '研发经理',
    port: 3005,
    configPath: '~/.zeroclaw/config-rd.json',
    avatar: '🔧',
    description: '研发团队负责人'
  },
  {
    id: 'marketing-lead',
    name: '营销主管',
    departmentId: 'marketing',
    jobLevelId: 'manager',
    title: '营销经理',
    port: 3006,
    configPath: '~/.zeroclaw/config-marketing.json',
    avatar: '📢',
    description: '营销团队负责人'
  },
  {
    id: 'legal-advisor',
    name: '法务顾问',
    departmentId: 'legal',
    jobLevelId: 'senior',
    title: '高级法务专员',
    port: 3007,
    configPath: '~/.zeroclaw/config-legal.json',
    avatar: '⚖️',
    description: '法务支持'
  },
  {
    id: 'hr-manager',
    name: 'HR经理',
    departmentId: 'hr',
    jobLevelId: 'manager',
    title: '人力资源经理',
    port: 3008,
    configPath: '~/.zeroclaw/config-hr.json',
    avatar: '👥',
    description: '人力资源负责人'
  },
  {
    id: 'accountant',
    name: '会计',
    departmentId: 'accounting',
    jobLevelId: 'senior',
    title: '高级会计',
    port: 3009,
    configPath: '~/.zeroclaw/config-accountant.json',
    avatar: '📊',
    description: '账务处理专员'
  },
  {
    id: 'ops-specialist',
    name: '运营专员',
    departmentId: 'operations',
    jobLevelId: 'junior',
    title: '运营专员',
    port: 3010,
    configPath: '~/.zeroclaw/config-ops.json',
    avatar: '⚙️',
    description: '日常运营支持'
  }
];

// 根据ID获取部门
export function getDepartmentById(id: string): Department | undefined {
  return DEFAULT_DEPARTMENTS.find(d => d.id === id);
}

// 根据类型获取部门
export function getDepartmentsByType(type: Department['type']): Department[] {
  return DEFAULT_DEPARTMENTS.filter(d => d.type === type);
}

// 根据ID获取职级
export function getJobLevelById(id: string): JobLevel | undefined {
  return DEFAULT_JOB_LEVELS.find(l => l.id === id);
}

// 获取子部门
export function getChildDepartments(parentId: string): Department[] {
  return DEFAULT_DEPARTMENTS.filter(d => d.parentDepartmentId === parentId);
}
