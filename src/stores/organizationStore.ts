/**
 * 组织架构管理 Store
 * 管理部门、职级、成员分配
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { 
  Department, 
  JobLevel, 
  OrganizationMember, 
  OrganizationConfig,
  ZeroClawInstance 
} from '@/shared/types/organization';
import { 
  DEFAULT_DEPARTMENTS, 
  DEFAULT_JOB_LEVELS,
  PRESET_ZEROCLAW_INSTANCES 
} from '@/shared/constants/organizationCatalog';

export const useOrganizationStore = defineStore('organization', () => {
  // State
  const departments = ref<Department[]>([...DEFAULT_DEPARTMENTS]);
  const jobLevels = ref<JobLevel[]>([...DEFAULT_JOB_LEVELS]);
  const members = ref<OrganizationMember[]>([]);
  const zeroclawInstances = ref<ZeroClawInstance[]>([...PRESET_ZEROCLAW_INSTANCES]);
  const organizationName = ref<string>('My Company');
  const isLoaded = ref<boolean>(false);

  // Getters
  const getDepartmentById = computed(() => {
    return (id: string) => departments.value.find(d => d.id === id);
  });

  const getJobLevelById = computed(() => {
    return (id: string) => jobLevels.value.find(l => l.id === id);
  });

  const getMembersByDepartment = computed(() => {
    return (departmentId: string) => 
      members.value.filter(m => m.departmentId === departmentId);
  });

  const getMembersByJobLevel = computed(() => {
    return (jobLevelId: string) => 
      members.value.filter(m => m.jobLevelId === jobLevelId);
  });

  const getZeroclawInstanceById = computed(() => {
    return (id: string) => zeroclawInstances.value.find(i => i.id === id);
  });

  const topLevelDepartments = computed(() => 
    departments.value.filter(d => d.level === 0)
  );

  const organizationChart = computed(() => {
    // 构建组织架构树
    const buildTree = (parentId?: string): (Department & { children: Department[] })[] => {
      return departments.value
        .filter(d => parentId ? d.parentDepartmentId === parentId : !d.parentDepartmentId)
        .map(d => ({
          ...d,
          children: buildTree(d.id)
        }));
    };
    return buildTree();
  });

  // Actions
  function addDepartment(department: Department) {
    departments.value.push(department);
  saveToStorage();
  }

  function updateDepartment(id: string, updates: Partial<Department>) {
    const index = departments.value.findIndex(d => d.id === id);
    if (index !== -1) {
      departments.value[index] = { ...departments.value[index], ...updates };
      saveToStorage();
    }
  }

  function removeDepartment(id: string) {
    departments.value = departments.value.filter(d => d.id !== id);
    saveToStorage();
  }

  function addJobLevel(level: JobLevel) {
    jobLevels.value.push(level);
    jobLevels.value.sort((a, b) => b.level - a.level);
    saveToStorage();
  }

  function updateJobLevel(id: string, updates: Partial<JobLevel>) {
    const index = jobLevels.value.findIndex(l => l.id === id);
    if (index !== -1) {
      jobLevels.value[index] = { ...jobLevels.value[index], ...updates };
      saveToStorage();
    }
  }

  function removeJobLevel(id: string) {
    jobLevels.value = jobLevels.value.filter(l => l.id !== id);
    saveToStorage();
  }

  function assignMemberToDepartment(memberId: string, departmentId: string, jobLevelId: string, title: string) {
    const existingIndex = members.value.findIndex(m => m.memberId === memberId);
    const department = departments.value.find(d => d.id === departmentId);
    
    const memberData: OrganizationMember = {
      memberId,
      departmentId,
      departmentType: department?.type || 'custom',
      jobLevelId,
      title,
      joinDate: Date.now()
    };

    if (existingIndex !== -1) {
      members.value[existingIndex] = memberData;
    } else {
      members.value.push(memberData);
    }
    saveToStorage();
  }

  function removeMemberFromOrganization(memberId: string) {
    members.value = members.value.filter(m => m.memberId !== memberId);
    saveToStorage();
  }

  function addZeroclawInstance(instance: ZeroClawInstance) {
    zeroclawInstances.value.push(instance);
    saveToStorage();
  }

  function removeZeroclawInstance(id: string) {
    zeroclawInstances.value = zeroclawInstances.value.filter(i => i.id !== id);
    saveToStorage();
  }

  function getOrganizationConfig(): OrganizationConfig {
    return {
      id: 'org-1',
      name: organizationName.value,
      departments: departments.value,
      jobLevels: jobLevels.value,
      members: members.value,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  }

  function loadFromConfig(config: OrganizationConfig) {
    organizationName.value = config.name;
    departments.value = config.departments;
    jobLevels.value = config.jobLevels;
    members.value = config.members;
    isLoaded.value = true;
  }

  async function saveToStorage() {
    // TODO: 使用 Tauri 存储API保存到本地
    const config = getOrganizationConfig();
    console.log('Saving organization config:', config);
  }

  async function loadFromStorage() {
    // TODO: 使用 Tauri 存储API从本地加载
    isLoaded.value = true;
  }

  // 初始化
  loadFromStorage();

  return {
    // State
    departments,
    jobLevels,
    members,
    zeroclawInstances,
    organizationName,
    isLoaded,

    // Getters
    getDepartmentById,
    getJobLevelById,
    getMembersByDepartment,
    getMembersByJobLevel,
    getZeroclawInstanceById,
    topLevelDepartments,
    organizationChart,

    // Actions
    addDepartment,
    updateDepartment,
    removeDepartment,
    addJobLevel,
    updateJobLevel,
    removeJobLevel,
    assignMemberToDepartment,
    removeMemberFromOrganization,
    addZeroclawInstance,
    removeZeroclawInstance,
    getOrganizationConfig,
    loadFromConfig,
    saveToStorage,
    loadFromStorage
  };
});
