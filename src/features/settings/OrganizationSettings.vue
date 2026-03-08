<!--
  Organization Settings Component
  Manage departments, job levels, and member assignments
-->
<template>
  <div class="organization-settings">
    <div class="mb-8">
      <h3 class="text-white/90 text-lg font-semibold mb-2 flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">business</span>
        {{ t('organization.title') }}
      </h3>
      <p class="text-white/40 text-sm">{{ t('organization.description') }}</p>
    </div>

    <div class="flex gap-2 mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
          activeTab === tab.id 
            ? 'bg-primary/20 text-primary border border-primary/31' 
            : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
        ]"
        @click="activeTab = tab.id"
      >
        <span class="material-symbols-outlined text-sm mr-1 align-middle">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>

    <div v-show="activeTab === 'departments'" class="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
      <DepartmentManager />
    </div>

    <div v-show="activeTab === 'jobLevels'" class="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
      <JobLevelManager />
    </div>

    <div v-show="activeTab === 'zeroclaw'" class="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
      <h4 class="text-white/80 font-medium mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined text-xl">smart_toy</span>
        ZeroClaw Preset
      </h4>
      <div class="grid gap-3 md:grid-cols-2">
        <div 
          v-for="instance in organizationStore.zeroclawInstances" 
          :key="instance.id"
          class="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-colors"
        >
          <div class="text-2xl">{{ instance.avatar }}</div>
          <div class="flex-1">
            <div class="text-white font-medium">{{ instance.name }}</div>
            <div class="text-white/40 text-sm">{{ instance.title }} - Port {{ instance.port }}</div>
          </div>
          <div class="text-xs text-white/30">
            {{ getDepartmentName(instance.departmentId) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useOrganizationStore } from '@/stores/organizationStore';
import DepartmentManager from './DepartmentManager.vue';
import JobLevelManager from './JobLevelManager.vue';

const { t } = useI18n();
const organizationStore = useOrganizationStore();

const activeTab = ref('departments');

const tabs = [
  { id: 'departments', label: t('organization.departments.title'), icon: 'business' },
  { id: 'jobLevels', label: t('organization.jobLevels.title'), icon: 'stairs' },
  { id: 'zeroclaw', label: 'ZeroClaw', icon: 'smart_toy' }
];

function getDepartmentName(id: string) {
  const dept = organizationStore.getDepartmentById(id);
  return dept?.name || '-';
}
</script>

<style scoped>
.organization-settings {
  @apply w-full;
}
</style>
