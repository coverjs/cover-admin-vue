<script lang="ts" setup>
import type { CreateMenuDto, MenuVo } from '@/services';
import { useAccess, useRequest } from '@/hooks';
import { api } from '@/services';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { LakySvgIcon } from '@lakyjs/components-vue-layout';
import { h } from 'vue';
import MenuDrawer from './MenuDrawer.vue';

defineOptions({
  name: 'MenuPage',
});

const columns = [
  { title: '菜单名称', dataIndex: 'name', key: 'name' },
  { title: '图标', dataIndex: 'icon', key: 'icon' },
  { title: '路由', dataIndex: 'path', key: 'path' },
  { title: 'locale', dataIndex: 'locale', key: 'locale' },
  { title: '权限标识', dataIndex: 'code', key: 'code' },
  { title: '排序', dataIndex: 'sort', key: 'sort' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '操作', dataIndex: 'operation', key: 'operation', width: 120 },
];

const { hasAccess } = useAccess();
const open = ref<boolean>(false);
const tableData = shallowRef<MenuVo[]>([]);
const defaultFormData: CreateMenuDto = {
  name: '',
  icon: '',
  locale: '',
  path: '',
  code: '',
  sort: 0,
  parentId: void 0,
  type: 'DIRECTORY',
};
const formData = ref<CreateMenuDtoWithId>(defaultFormData);
const type = ref<boolean>(false); // 编辑 | 新增

type MenuVoWithKey = MenuVo & { key: number };
export type CreateMenuDtoWithId = CreateMenuDto & { id?: number };

onMounted(() => {
  fetchData();
});

function generateTreeDataWithKey(data: MenuVo[]): MenuVoWithKey[] {
  return data.map((item: MenuVo) => {
    return {
      ...item,
      key: item.id,
      children: item.children
        ? generateTreeDataWithKey(item.children)
        : void 0,
    };
  });
}

const treeTableData = computed(() => {
  return generateTreeDataWithKey(tableData.value);
});

// const { isLoading, error, execute, state } = await api.system.menuFindList({ customOptions: { responseMode: 'reactive' } }) as unknown as ReactiveResponse<MenuVo[]>;
const { isLoading, error, execute, state } = useRequest(api.system.menuFindList, { list: [], total: 0 });

async function fetchData() {
  await execute();
  if (!error.value) {
    tableData.value = state.value.data!.list;
  }
}

function onDelete(_id: number) {
  // TODO 删除
}

function showDrawer(state: boolean) {
  open.value = true;
  type.value = state;
}

function handleEdit(record: MenuVoWithKey) {
  const { children, createdAt, updatedAt, key, ...rest } = record;
  formData.value = rest;
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
    <a-card :title="$t('pages.system.menuQuery')" class="mb-[24px]">
      <!-- TODO 查询 -->
    </a-card>

    <a-card :title="$t('pages.system.menu.menuList')">
      <template #extra>
        <a-button v-if="hasAccess(['system:menu:add'])" type="primary" @click="handleAdd">
          {{ $t("pages.system.menu.createMenu") }}
        </a-button>
      </template>
      <a-table
        v-if="hasAccess(['system:menu:list'])"
        :columns="columns"
        :data-source="treeTableData"
        :loading="isLoading"
        :pagination="false"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'icon'">
            <laky-svg-icon :name="text" />
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <a-space>
                <a-button
                  v-if="hasAccess(['system:menu:update'])"
                  type="link"
                  :icon="h(EditOutlined)"
                  @click="handleEdit(record)"
                />
                <a-popconfirm v-if="tableData.length" :title="$t('fallback.sureDelete')" @confirm="onDelete(record.id)">
                  <a-button
                    v-if="hasAccess(['system:menu:delete'])"
                    type="link"
                    danger
                    :icon="h(DeleteOutlined)"
                  />
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
      :tree-data="tableData"
      @refresh="refresh"
    />
  </div>
</template>
