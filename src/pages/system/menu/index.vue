<script lang="ts" setup>
import { h, ref } from 'vue';
import { api, CreateMenuDto, MenuVo } from '@/services';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import AsyncIcon from '@/components/SubMenu/AsyncIcon.vue';
import MenuDrawer from '@/pages/system/menu/MenuDrawer.vue';

defineOptions({
  name: 'MenuPage',
});

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
  },
  {
    title: '组件',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: 'locale',
    dataIndex: 'locale',
    key: 'locale',
  },
  {
    title: '权限标识',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
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
const tableData = shallowRef<MenuVo[]>([]);
const defaultFormData: CreateMenuDto = {
  name: '',
  icon: '',
  locale: '',
  path: '',
  code: '',
  sort: 0,
  parentId: undefined,
  type: 'MENU',
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
        : undefined,
    };
  });
}

const treeTableData = computed(() => {
  return generateTreeDataWithKey(tableData.value);
});

const fetchData = async () => {
  const { data: res } = await api.system.menuFindList();
  if (res.code === 0) {
    tableData.value = res.data;
  }
};

const onDelete = (id: number) => {
  console.log(id);
};

const showDrawer = (state: boolean) => {
  open.value = true;
  type.value = state;
};

function handleEdit(record: MenuVoWithKey) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  <a-card title="菜单查询" class="mb-[24px]">
    <!--TODO 查询-->
  </a-card>

  <a-card title="菜单列表">
    <template #extra>
      <a-button type="primary" @click="handleAdd">新增菜单</a-button>
    </template>
    <a-table :columns="columns" :data-source="treeTableData">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'icon'">
          <async-icon :icon="text" />
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <a-space>
              <a-button
                type="link"
                @click="handleEdit(record)"
                :icon="h(EditOutlined)"
              ></a-button>
              <a-popconfirm
                v-if="tableData.length"
                title="确定删除?"
                @confirm="onDelete(record.id)"
              >
                <a-button
                  type="link"
                  danger
                  :icon="h(DeleteOutlined)"
                ></a-button>
              </a-popconfirm>
            </a-space>
          </div>
        </template>
      </template>
    </a-table>
  </a-card>
  <MenuDrawer
    v-model:open="open"
    :type
    :formData
    :treeData="tableData"
    @refresh="refresh"
  />
</template>
