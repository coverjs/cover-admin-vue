<script lang="ts" setup>
import type { RoleVo, UpdateRoleDto } from '@/services';
import type { FormInstance } from 'ant-design-vue';
import type { UnwrapRef } from 'vue';
import { useRequest } from '@/hooks';

import { api } from '@/services';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
import MenuDrawer from './RoleDrawer.vue';

defineOptions({
  name: 'RolePage',
});

const columns = [
  { title: '角色', dataIndex: 'name', key: 'name' },
  { title: '角色描述', dataIndex: 'description', key: 'description' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '操作', dataIndex: 'operation', key: 'operation', width: 120 },
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

interface IQueryParam {
  pageNum: number
  pageSize: number
  name: string
}

const queryParam = ref<Partial<IQueryParam>>({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);

const pagination = computed(() => ({
  total: total.value,
  current: queryParam.value.pageNum,
  pageSize: queryParam.value.pageSize
}));

onMounted(() => {
  fetchData();
});

// const { isLoading, error, execute, state } = await api.system.menuFindList({ customOptions: { responseMode: 'reactive' } }) as unknown as ReactiveResponse<MenuVo[]>;
const { isLoading, error, execute, state } = useRequest(() => api.system.roleFineList(toRaw(queryParam.value)), { list: [], total: 0 });

async function fetchData() {
  await execute();
  if (!error.value) {
    tableData.value = state.value.data!.list;
    total.value = state.value.data!.total;
  }
}

function handleTableChange(pagination: any) {
  queryParam.value = {
    ...queryParam.value,
    pageNum: pagination.current,
    pageSize: pagination.pageSize,
  };
}

watch(queryParam, async () => {
  await execute();
  if (!error.value) {
    tableData.value = state.value.data!.list;
    total.value = state.value.data!.total;
  }
}, {
  deep: true,
});

async function handleDelete(_id: number) {
  const res = await api.system.roleRemove(_id);
  if (res.code === 0) {
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

// ----------- 搜索表单 -----------
interface FormState {
  name: string
}
const formRef = ref<FormInstance>();
const formState: UnwrapRef<FormState> = reactive({
  name: '',
});

function handleFinish() {
  queryParam.value = {
    pageNum: 1,
    pageSize: 10,
    ...formState,
  };
}

function resetForm() {
  formRef.value?.resetFields();
  queryParam.value = {
    pageNum: 1,
    pageSize: 10,
  };
}
</script>

<template>
  <div>
    <a-card :title="$t('pages.system.menuQuery')" class="mb-[24px]">
      <a-form
        ref="formRef"
        layout="inline"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        :model="formState"
      >
        <a-row class="w-full">
          <a-col :span="6">
            <a-form-item label="角色" name="name">
              <a-input v-model:value="formState.name" placeholder="请输入" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="w-full flex-row-reverse mt-4">
          <a-form-item>
            <a-space>
              <a-button @click="resetForm">
                {{ $t('common.reset') }}
              </a-button>
              <a-button type="primary" @click="handleFinish">
                {{ $t('common.search') }}
              </a-button>
            </a-space>
          </a-form-item>
        </a-row>
      </a-form>
    </a-card>

    <a-card :title="$t('pages.system.role.roleList')">
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          {{ $t("pages.system.role.createRole") }}
        </a-button>
      </template>
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="isLoading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
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
