<script lang="ts" setup>
import type { RoleVo } from '@/services';
import type { ICreateUser } from './index.vue';
import { useMessage, useRequest } from '@/hooks';
import { api } from '@/services';
import crypto from 'crypto-js';
import { ref } from 'vue';

interface Props {
  type: boolean
  formData: ICreateUser
  hashType?:
    | 'MD5'
    | 'SHA1'
    | 'SHA256'
    | 'SHA224'
    | 'SHA3'
    | 'SHA384'
    | 'SHA512'
    | 'RIPEMD160'
}

const props = withDefaults(defineProps<Props>(), {
  type: false,
  hashType: 'MD5'
});

const emit = defineEmits<{
  (e: 'refresh'): void
}>();

const open = defineModel('open');
const formRef = ref();
const formState = ref<ICreateUser>(toRaw(props.formData));
const { createNotify } = useMessage();

function handleClose() {
  open.value = false;
  formRef.value.resetFields();
}

function handleResponse(res: any, successMessage: string) {
  if (res.code === 0) {
    createNotify.success({
      message: successMessage,
      duration: 3,
    });
    open.value = false;
    emit('refresh');
  }
}

async function handleSubmit() {
  try {
    await formRef.value?.validate();
    const formData = JSON.parse(JSON.stringify(formState.value));
    if (props.type) {
      formData.password = crypto[props.hashType]?.(formData.password)?.toString();
      const data = await api.system.userCreate(formData);
      handleResponse(data, '新增成功');
    }
    else {
      const id = formData.id!;
      // TODO 修改用户接口还没完成 waiting
      return id;
      // const { data: res } = await api.system.userUpdate(id, formData as unknown as UpdateRoleDto);
      // handleResponse(res, '修改成功');
    }
  }
  catch (error: any) {
    console.error(error);
  }
}

const roleList = ref<RoleVo[]>([]);
const { error, execute, state } = useRequest(api.system.roleFineList, {} as any);

onMounted(async () => {
  await execute();
  if (!error.value) {
    roleList.value = state.value.data!.list;
  }
});

watch(
  () => props.formData,
  value => {
    formState.value = toRaw(value);
  },
  { immediate: true },
);
</script>

<template>
  <a-drawer
    v-model:open="open"
    width="30%"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    :title="type
      ? $t('pages.system.user.createUser')
      : $t('pages.system.user.editUser')
    "
    placement="right"
    destroy-on-close
    :footer-style="{ textAlign: 'right' }"
    @close="handleClose"
  >
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item label="昵称" name="nickname" :rules="[{ required: true, message: '请输入昵称' }]">
        <a-input v-model:value="formState.nickname" />
      </a-form-item>
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item
        v-if="type"
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password v-model:value="formState.password" type="password" />
      </a-form-item>
      <a-form-item
        label="邮箱"
        name="email"
        :rules="[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item label="角色" name="roleId" :rules="[{ required: true, message: '请选择角色' }]">
        <a-select v-model:value="formState.roleId">
          <a-select-option v-for="item in roleList" :key="item.id" :value="item.id">
            {{
              item.name
            }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态" name="enable">
        <a-switch v-model:checked="formState.enable" />
      </a-form-item>
    </a-form>

    <template #footer>
      <a-button style="margin-right: 8px" @click="handleClose">
        {{
          $t('common.cancel')
        }}
      </a-button>
      <a-button type="primary" @click="handleSubmit">
        {{
          $t('common.confirm')
        }}
      </a-button>
    </template>
  </a-drawer>
</template>
