<script lang="ts" setup>
import type { CreateUserDto, UpdateUserDto, UserInfoVo } from '@/services';
import type { FormInstance, TableColumnType } from 'ant-design-vue';
import type { UnwrapRef } from 'vue';
import { useMessage, useRequest } from '@/hooks';
import { api } from '@/services';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { h, ref } from 'vue';
import UserDrawer from './UserDrawer.vue';

defineOptions({
  name: 'UserPage',
});
const { createNotify } = useMessage();
const open = ref(false);
const type = ref<boolean>(false); // 编辑 true | 新增 false
const userList = shallowRef<UserInfoVo[]>([]);

export type ICreateUser = CreateUserDto & { id?: number };
export type IUserInfo = UserInfoVo & { password: string, id?: number };
interface IQueryParam {
  pageNum: number
  pageSize: number
  username: string
  nickname: string
  email: string
  roleId: number
  enable: boolean
}

const defaultFormData: ICreateUser = {
  username: '',
  nickname: '',
  password: '',
  email: '',
  roleId: 1,
  enable: true,
};

const queryParam = ref<Partial<IQueryParam>>({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const formData = ref<ICreateUser>(defaultFormData);

const pagination = computed(() => ({
  total: total.value,
  current: queryParam.value.pageNum,
  pageSize: queryParam.value.pageSize
}));

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
  const updateUser = JSON.parse(JSON.stringify(user));
  delete updateUser.role;
  try {
    const res = await api.system.userUpdateUser(updateUser.id!, updateUser as unknown as UpdateUserDto);
    if (res.code === 0) {
      createNotify.success({
        message: '修改成功',
        duration: 3,
      });
      getUserList();
    }
    else {
      createNotify.error({
        message: res.msg,
        duration: 3,
      });
    }
  }
  catch (e: any) {
    createNotify.error({
      message: e.message,
      duration: 3,
    });
  }
}

// 获取用户列表
// const { isLoading, error, execute, state } = await api.system.userFindList(toRaw(queryParam.value), { customOptions: { responseMode: 'reactive' } }) as unknown as ReactiveResponse<UserInfoVo[]>;
const { isLoading, error, execute, state } = useRequest(() => api.system.userFindList(toRaw(queryParam.value)), { list: [], total: 0 });

async function getUserList() {
  await execute();
  if (!error.value) {
    userList.value = state.value.data!.list;
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
    userList.value = state.value.data!.list;
    total.value = state.value.data!.total;
  }
}, {
  deep: true,
});

function handleEdit(user: IUserInfo) {
  const { createdAt, updatedAt, role, ...rest } = user;
  formData.value = { ...rest };
  showDrawer(false);
}

async function handleDelete(id: number) {
  const data = await api.system.userDeleteUser(id);
  if (data.code === 0) {
    createNotify.success({
      message: '删除成功',
      duration: 3,
    });
    getUserList();
  }
  else {
    createNotify.error({
      message: data.msg,
      duration: 3,
    });
  }
}

onMounted(() => {
  getUserList();
});

function refresh() {
  getUserList();
}

// ----------------- 菜单查询 -----------------
interface FormState {
  username: string
  nickname: string
}
const formRef = ref<FormInstance>();
const formState: UnwrapRef<FormState> = reactive({
  username: '',
  nickname: '',
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
  <div class="user-management">
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
            <a-form-item label="用户名" name="username">
              <a-input v-model:value="formState.username" placeholder="请输入" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="昵称" name="nickname">
              <a-input v-model:value="formState.nickname" placeholder="请输入" allow-clear />
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

    <a-card :title="$t('pages.system.user.userList')">
      <template #extra>
        <a-button v-access="['system:user:add']" type="primary" @click="handleAddUser">
          {{ $t("pages.system.user.createUser") }}
        </a-button>
      </template>

      <a-table
        v-access="['system:user:list']"
        :columns="columns"
        :data-source="userList"
        :loading="isLoading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'role'">
            {{ record.role?.name }}
          </template>

          <template v-else-if="column.dataIndex === 'enable'">
            <a-switch v-model:checked="record.enable" @change="handleEnableOrDisableUser(record)" />
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <a-space>
                <a-button
                  v-access="['system:user:update']"
                  type="link"
                  :icon="h(EditOutlined)"
                  @click="handleEdit(record)"
                />
                <a-popconfirm
                  v-if="userList.length"
                  :title="$t('fallback.sureDelete')"
                  @confirm="handleDelete(record.id)"
                >
                  <a-button
                    v-access="['system:user:delete']"
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

    <user-drawer
      v-model:open="open"
      :type
      :form-data
      @refresh="refresh"
    />
  </div>
</template>

<style lang="scss" scoped></style>
