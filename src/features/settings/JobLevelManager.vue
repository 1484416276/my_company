  职级管理组件
  提供职级的增删改查功能
-->
<template>
  <div class="joblevel-manager">
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-white/80 font-medium flex items-center gap-2">
        <span class="material-symbols-outlined text-xl">stairs</span>
        {{ t('organization.jobLevels.title') }}
      </h4>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-[12px] font-semibold text-primary hover:bg-primary/20 transition-colors"
        @click="handleAddLevel"
      >
        <span class="material-symbols-outlined text-[16px]">add</span>
        {{ t('organization.jobLevels.add') }}
      </button>
    </div>

    <div class="space-y-2">
      <div
        v-for="level in sortedLevels"
        :key="level.id"
        class="group flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-all"
      >
        <div :class="['w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm', level.badgeColor || 'bg-gray-500']">
          L{{ level.level }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-white font-medium truncate">{{ level.name }}</div>
          <div class="text-white/40 text-sm truncate">{{ level.description }}</div>
        </div>
        <div class="text-white/30 text-xs px-2 py-1 rounded bg-white/5">
          {{ t('organization.jobLevels.level') }}: {{ level.level }}
        </div>
        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            :title="t('common.edit')"
            @click="handleEditLevel(level)"
          >
            <span class="material-symbols-outlined text-[18px] text-white/60 hover:text-white">edit</span>
          </button>
          <button
            type="button"
            class="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
            :title="t('common.delete')"
            @click="handleDeleteLevel(level)"
          >
            <span class="material-symbols-outlined text-[18px] text-red-400/60 hover:text-red-400">delete</span>
          </button>
        </div>
      </div>
      <div v-if="jobLevels.length === 0" class="text-center py-8 text-white/40">
        <span class="material-symbols-outlined text-4xl mb-2">layers_clear</span>
        <p class="text-sm">{{ t('organization.jobLevels.empty') }}</p>
      </div>
    </div>

    <div v-if="showEditDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="showEditDialog = false">
      <div class="bg-panel-strong border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4">
        <h3 class="text-white font-semibold text-lg mb-4">
          {{ editingLevel ? t('organization.jobLevels.edit') : t('organization.jobLevels.add') }}
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-white/60 text-sm mb-1.5">{{ t('organization.jobLevels.name') }}</label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full px-3 py-2 bg-surface/80 border border-white/10 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-sm"
              :placeholder="t('organization.jobLevels.namePlaceholder')"
            />
          </div>
          
          <div>
            <label class="block text-white/60 text-sm mb-1.5">{{ t('organization.jobLevels.description') }}</label>
            <input
              v-model="formData.description"
              type="text"
              class="w-full px-3 py-2 bg-surface/80 border border-white/10 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-sm"
              :placeholder="t('organization.jobLevels.descPlaceholder')"
            />
          </div>
          
          <div>
            <label class="block text-white/60 text-sm mb-1.5">{{ t('organization.jobLevels.level') }}</label>
            <input
              v-model.number="formData.level"
              type="number"
              min="1"
              max="20"
              class="w-full px-3 py-2 bg-surface/80 border border-white/10 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-sm"
              placeholder="1-20"
            />
          </div>
          
          <div>
            <label class="block text-white/60 text-sm mb-1.5">{{ t('organization.jobLevels.badgeColor') }}</label>
            <select
              v-model="formData.badgeColor"
              class="w-full px-3 py-2 bg-surface/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary/50 text-sm"
            >
              <option value="bg-gray-500">灰色</option>
              <option value="bg-blue-500">蓝色</option>
              <option value="bg-green-500">绿色</option>
              <option value="bg-purple-500">紫色</option>
              <option value="bg-orange-500">橙色</option>
              <option value="bg-red-500">红色</option>
              <option value="bg-cyan-500">青色</option>
              <option value="bg-yellow-500">黄色</option>
            </select>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button
            type="button"
            class="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            @click="showEditDialog = false"
          >
            {{ t('common.cancel') }}
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-lg border border-primary/30 bg-primary/10 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            @click="handleSaveLevel"
          >
            {{ t('common.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useOrganizationStore } from '@/stores/organizationStore';
import type { JobLevel } from '@/shared/types/organization';

const { t } = useI18n();
const organizationStore = useOrganizationStore();

const jobLevels = computed(() => organizationStore.jobLevels);
const sortedLevels = computed(() => 
  [...jobLevels.value].sort((a, b) => b.level - a.level)
);

const showEditDialog = ref(false);
const editingLevel = ref<JobLevel | null>(null);
const formData = ref({
  name: '',
  description: '',
  level: 1,
  badgeColor: 'bg-blue-500'
});

function handleAddLevel() {
  editingLevel.value = null;
  formData.value = {
    name: '',
    description: '',
    level: 1,
    badgeColor: 'bg-blue-500'
  };
  showEditDialog.value = true;
}

function handleEditLevel(level: JobLevel) {
  editingLevel.value = level;
  formData.value = {
    name: level.name,
    description: level.description,
    level: level.level,
    badgeColor: level.badgeColor || 'bg-blue-500'
  };
  showEditDialog.value = true;
}

function handleSaveLevel() {
  if (editingLevel.value) {
    // 更新职级
    organizationStore.updateJobLevel(editingLevel.value.id, {
      name: formData.value.name,
      description: formData.value.description,
      level: formData.value.level,
      badgeColor: formData.value.badgeColor
    });
  } else {
    // 添加新职级
    organizationStore.addJobLevel({
      id: 'level-' + Date.now(),
      name: formData.value.name,
      description: formData.value.description,
      level: formData.value.level,
      badgeColor: formData.value.badgeColor
    });
  }
  showEditDialog.value = false;
}

function handleDeleteLevel(level: JobLevel) {
  if (confirm(t('organization.jobLevels.deleteConfirm', { name: level.name }))) {
    organizationStore.removeJobLevel(level.id);
  }
}
</script>

<style scoped>
.joblevel-manager {
  @apply w-full;
}
</style>
