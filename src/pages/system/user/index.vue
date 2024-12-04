<script lang="ts" setup>
import type { CreateUserDto, UserInfoVo } from '@/services';
import type { ReactiveResponse } from '@/types';
import type { TableColumnType } from 'ant-design-vue';
import { api } from '@/services';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
import UserDrawer from './UserDrawer.vue';

defineOptions({
  name: 'UserPage',
});

const open = ref(false);
const type = ref<boolean>(false); // 编辑 true | 新增 false
const userList = ref<UserInfoVo[]>([]);

export type ICreateUser = CreateUserDto & { id?: number };
export type IUserInfo = UserInfoVo & { password: string };

const defaultFormData: ICreateUser = {
  username: '',
  nickname: '',
  password: '',
  email: '',
  roleId: 1,
  enable: true,
};

const pagination = reactive({ pageNum: 1, pageSize: 10 });

interface IQueryParam {
  pageNum: number
  pageSize: number
  username: string
  nickname: string
  email: string
  roleId: number
  enable: boolean
}

const queryParam = ref<Partial<IQueryParam>>({});

const formData = ref<ICreateUser>(defaultFormData);

// 设置表格列
const columns: TableColumnType<IUserInfo>[] = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '昵称', dataIndex: 'nickname', key: 'nickname' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '角色', dataIndex: 'role', key: 'role' },
  { title: '状态', dataIndex: 'enable', key: 'enable' },
  { title: '操作', dataIndex: 'operation', key: 'operation', width: 120 },
];

function handleAddUser() {
  formData.value = defaultFormData;
  showDrawer(true);
}

function showDrawer(state: boolean) {
  open.value = true;
  type.value = state;
}

async function handleEnableOrDisableUser(user: IUserInfo) {
  // TODO 启用或禁用用户 后端接口还没写
  return user;
}

// 获取用户列表
const { isLoading, error, execute, state } = await api.system.userFindList(toRaw(queryParam.value), { customOptions: { responseMode: 'reactive' } }) as unknown as ReactiveResponse<UserInfoVo[]>;
async function getUserList() {
  await execute();
  if (!error.value) {
    userList.value = state.value.data;
  }
}

watch(pagination, value => {
  queryParam.value = { ...queryParam.value, ...value };
});

watch(queryParam, async () => {
  // TODO queryParam 变化时重新获取用户列表 这里有问题
  await execute(2000);
});

function handleEdit(user: IUserInfo) {
  const { createdAt, updatedAt, role, ...rest } = user;
  const roleId = role?.id || 0;
  formData.value = { ...rest, roleId };
  showDrawer(false);
}

function handleDelete(id: number) {
  // TODO 删除用户
  return id;
}

onMounted(() => {
  getUserList();
});

function refresh() {
  getUserList();
}
</script>

<template>
  <div class="user-management">
    <a-card title="用户管理">
      <template #extra>
        <a-button type="primary" @click="handleAddUser">
          {{ $t("pages.system.user.createUser") }}
        </a-button>
      </template>

      <a-table :columns="columns" :data-source="userList" :loading="isLoading">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'icon'">
            <async-icon :icon="text" />
          </template>
          <template v-if="column.dataIndex === 'role'">
            {{ record.role?.name }}
          </template>

          <template v-else-if="column.dataIndex === 'enable'">
            <a-switch v-model:checked="record.enable" @change="handleEnableOrDisableUser(record)" />
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <a-space>
                <a-button type="link" :icon="h(EditOutlined)" @click="handleEdit(record)" />
                <a-popconfirm
                  v-if="userList.length"
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
      <div class="flex m-auto">
        <a-pagination v-model:current="pagination.pageNum" v-model:page-size="pagination.pageSize" :total="500" />
      </div>
    </a-card>

    <user-drawer
      v-model:open="open"
      :type
      :form-data
      @refresh="refresh"
    />
  </div>
</template>

<style lang="scss" scoped></style>
