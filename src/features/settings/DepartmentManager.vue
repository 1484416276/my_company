  部门管理组件
  提供部门的增删改查功能
-->
<template>
  <div class="department-manager">
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-white/80 font-medium flex items-center gap-2">
        <span class="material-symbols-outlined text-xl">business</span>
        {{ t('organization.departments.title') }}
      </h4>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-[12px] font-semibold text-primary hover:bg-primary/20 transition-colors"
        @click="handleAddDepartment"
      >
        <span class="material-symbols-outlined text-[16px]">add</span>
        {{ t('organization.departments.add') }}
      </button>
    </div>

    <div class="space-y-2">
      <div
        v-for="dept in departments"
        :key="dept.id"
        class="group flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-all"
      >
        <div :class="['w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br', dept.gradient || 'from-gray-500 to-gray-600']">
          <span class="material-symbols-outlined text-white text-xl">{{ dept.icon || 'business' }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-white font-medium truncate">{{ dept.name }}</div>
          <div class="text-white/40 text-sm truncate">{{ dept.description }}</div>
        </div>
        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            :title="t('common.edit')"
            @click="handleEditDepartment(dept)"
          >
            <span class="material-symbols-outlined text-[18px] text-white/60 hover:text-white">edit</span>
          </button>
          <button
            type="button"
            class="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
            :title="t('common.delete')"
            @click="handleDeleteDepartment(dept)"
          >
            <span class="material-symbols-outlined text-[18px] text-red-400/60 hover:text-red-400">delete</span>
          </button>
        </div>
      </div>

      <div v-if="departments.length === 0" class="text-center py-8 text-white/40">
        <span class="material-symbols-outlined text-4xl mb-2">folder_off</span>
        <p class="text-sm">{{ t('organization.departments.empty') }}</p>
      </div>
    </div>

    <div v-if="showEditDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="showEditDialog = false">
      <div class="bg-panel-strong border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4">
        <h3 class="text-white font-semibold text-lg mb-4">
          {{ editingDepartment ? t('organization.departments.edit') : t('organization.departments.add') }}
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-white/60 text-sm mb-1.5">{{ t('organization.departments.name') }}</label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full px-3 py-2 bg-surface/80 border border-white/10 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-sm"
              :placeholder="t('organization.departments.namePlaceholder')"
            />
          </div>
          
          <div>
            <label class="block text-white/60 text-sm mb-1.5">{{ t('organization.departments.description') }}</label>
            <input
              v-model="formData.description"
              type="text"
              class="w-full px-3 py-2 bg-surface/80 border border-white/10 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-sm"
              :placeholder="t('organization.departments.descPlaceholder')"
            />
          </div>

          <div>
            <label class="block text-white/60 text-sm mb-1.5">{{ t('organization.departments.icon') }}</label>
            <input
              v-model="formData.icon"
              type="text"
              class="w-full px-3 py-2 bg-surface/80 border border-white/10 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-sm"
              placeholder="business"
            />
          </div>

          <div>
            <label class="block text-white/60 text-sm mb-1.5">{{ t('organization.departments.gradient') }}</label>
            <select
              v-model="formData.gradient"
              class="w-full px-3 py-2 bg-surface/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary/50 text-sm"
            >
              <option value="from-blue-500 to-blue-600">蓝色</option>
              <option value="from-green-500 to-green-600">绿色</option>
              <option value="from-purple-500 to-purple-600">紫色</option>
              <option value="from-orange-500 to-orange-600">橙色</option>
              <option value="from-pink-500 to-pink-600">粉色</option>
              <option value="from-cyan-500 to-cyan-600">青色</option>
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
            @click="handleSaveDepartment"
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
import type { Department } from '@/shared/types/organization';

const { t } = useI18n();
const organizationStore = useOrganizationStore();

const departments = computed(() => organizationStore.departments);

const showEditDialog = ref(false);
const editingDepartment = ref<Department | null>(null);
const formData = ref({
  name: '',
  description: '',
  icon: 'business',
  gradient: 'from-blue-500 to-blue-600'
});

function handleAddDepartment() {
  editingDepartment.value = null;
  formData.value = {
    name: '',
    description: '',
    icon: 'business',
    gradient: 'from-blue-500 to-blue-600'
  };
  showEditDialog.value = true;
}

function handleEditDepartment(dept: Department) {
  editingDepartment.value = dept;
  formData.value = {
    name: dept.name,
    description: dept.description,
    icon: dept.icon || 'business',
    gradient: dept.gradient || 'from-blue-500 to-blue-600'
  };
  showEditDialog.value = true;
}

function handleSaveDepartment() {

  if (editingDepartment.value) {
    // 更新部门
    organizationStore.updateDepartment(editingDepartment.value.id, {
      name: formData.value.name,
      description: formData.value.description,
      icon: formData.value.icon,
      gradient: formData.value.gradient
    });
  } else {
    // 添加新部门
    organizationStore.addDepartment({
      name: formData.value.name,
      description: formData.value.description,
      icon: formData.value.icon,
      gradient: formData.value.gradient,
      parentId: null
    });
  }

  showEditDialog.value = false;
}

function handleDeleteDepartment(dept: Department) {
  if (confirm(t('organization.departments.deleteConfirm', { name: dept.name }))) {
    organizationStore.removeDepartment(dept.id);
  }
}
</script>

<style scoped>
.department-manager {
  @apply w-full;
}
</style>
