<script lang="ts" setup>
import type { RoleVo, UpdateRoleDto } from '@/services';
import { useRequest } from '@/hooks';
import { api } from '@/services';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';

import { LakyAsyncIcon } from '@lakyjs/components-vue-layout';

import { h } from 'vue';
import MenuDrawer from './RoleDrawer.vue';

defineOptions({
  name: 'RolePage',
});

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '角色描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 120,
  },
];

const open = ref<boolean>(false);
const tableData = shallowRef<RoleVo[]>([]);
const defaultFormData: UpdateRoleDto = {
  name: '',
  description: '',
  menuIds: [],
};
const formData = ref<CreateRoleDtoWithId>(defaultFormData);
const type = ref<boolean>(false); // 编辑 | 新增
export type CreateRoleDtoWithId = UpdateRoleDto & { id?: number };

onMounted(() => {
  fetchData();
});

// const { isLoading, error, execute, state } = await api.system.menuFindList({ customOptions: { responseMode: 'reactive' } }) as unknown as ReactiveResponse<MenuVo[]>;
const { isLoading, error, execute, state } = useRequest(api.system.roleFineList, { list: [], total: 0 });

async function fetchData() {
  await execute();
  if (!error.value) {
    tableData.value = state.value.data!.list;
  }
}

async function handleDelete(_id: number) {
  const res = await api.system.roleRemove(_id);
  if (res.code === 0) {
    // TODO 删除逻辑
    fetchData();
  }
}

function showDrawer(state: boolean) {
  open.value = true;
  type.value = state;
}

function handleEdit(record: UpdateRoleDto) {
  formData.value = record;
  showDrawer(false);
}

function handleAdd() {
  formData.value = defaultFormData;
  showDrawer(true);
}

function refresh() {
  fetchData();
}
</script>

<template>
  <div>
    <a-card title="菜单查询" class="mb-[24px]">
      <!-- TODO 查询 -->
    </a-card>

    <a-card :title="$t('pages.system.menu.menuList')">
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          {{ $t("pages.system.menu.editMenu") }}
        </a-button>
      </template>
      <a-table :columns="columns" :data-source="tableData" :loading="isLoading">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'icon'">
            <laky-async-icon :icon="text" />
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <a-space>
                <a-button type="link" :icon="h(EditOutlined)" @click="handleEdit(record)" />
                <a-popconfirm
                  v-if="tableData.length"
                  :title="$t('fallback.sureDelete')"
                  @confirm="handleDelete(record.id)"
                >
                  <a-button type="link" danger :icon="h(DeleteOutlined)" />
                </a-popconfirm>
              </a-space>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
    <menu-drawer
      v-model:open="open"
      :t="$t"
      :type
      :form-data
      @refresh="refresh"
    />
  </div>
</template>
