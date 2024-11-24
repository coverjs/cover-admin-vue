<script setup lang="ts">
import type { AccountLoginDto, UserInfoVo } from '@/services'

import { useMessage } from '@/hooks'
import { useUserStore } from '@/store'
import { initialUserHash } from '@config'

defineOptions({ name: 'LoginPage' })

const userStore = useUserStore()
const loginFormRef = useTemplateRef<{ getFieldsValue: () => AccountLoginDto }>(
  'loginForm',
)
const { createNotify } = useMessage()
const { t } = useI18n()

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
)

async function login() {
  await logoinAction()
  if (loginError.value)
    return

  createNotify.success({
    message: t('authentication.loginSuccess'),
    description: `${t('authentication.loginSuccessDesc')},${userInfo.value?.nickname ?? ''}`,
    duration: 3,
  })
}
</script>

<template>
  <div class="login-form-container">
    <a-typography class="title-container">
      <a-typography-title class="title" :level="3">
        {{ t('authentication.loginTitle') }}
      </a-typography-title>
      <span class="title-extra">
        <a-space>
          <color-mode-toggle />
          <language-toggle />
        </a-space>
      </span>
    </a-typography>
    <login-form
      ref="loginForm"
      hash-type="RIPEMD160"
      :loading="loginLoading"
      :initial-user-hash="initialUserHash"
      secure-pwd
      @submit="login"
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
    .title-extra {
      display: flex;
      align-items: center;
      .dark-mode-switch {
        margin-left: 8px;
      }
    }
  }
}
</style>

<route lang="yaml">
name: login
meta:
  layout: login
  ignoreAuth: true
</route>
