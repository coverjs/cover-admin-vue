<script setup lang="ts">
import type { AccountLoginDto, UserInfoVo } from '@/services';
import type { FormInstance } from 'ant-design-vue/es/form/index';

import { initialUserHash } from '@config';
import { useUserStore } from '@/store';
import { useMessage } from '@/hooks';

defineOptions({ name: 'LoginPage' });

const userStore = useUserStore();
const loginFormRef = useTemplateRef<FormInstance>('loginForm');
const { createNotify } = useMessage();
const { t } = useI18n();

const {
  isLoading: loginLoading,
  error: loginError,
  execute: logoinAction,
  state: userInfo,
} = useAsyncState<Partial<UserInfoVo>>(
  () =>
    userStore.login(loginFormRef.value?.getFieldsValue() as AccountLoginDto),
  { nickname: '' },
  { immediate: false },
);

async function login() {
  await logoinAction();
  if (loginError.value) return;

  createNotify.success({
    message: t('authentication.loginSuccess'),
    description: `${t('authentication.loginSuccessDesc')},${userInfo.value?.nickname ?? ''}`,
    duration: 3,
  });
}
</script>

<template>
  <div class="login-form-container">
    <a-typography class="title-container">
      <a-typography-title class="title" :level="3"
        >{{ t('authentication.loginTitle') }}
      </a-typography-title>
      <language-toggle />
    </a-typography>
    <login-form
      ref="loginForm"
      hash-type="RIPEMD160"
      :loading="loginLoading"
      :initial-user-hash="initialUserHash"
      @submit="login"
      secure-pwd
    />
  </div>
</template>

<style lang="scss" scoped>
.login-form-container {
  width: 300px;
  margin: auto;

  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

<route lang="yaml">
name: login
meta:
  layout: login
  ignoreAuth: true
</route>
