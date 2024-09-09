<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue/lib/form/Form';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { CacheEnum } from '@/enums';

defineOptions({ name: 'LoginForm' });

withDefaults(
  defineProps<{
    loading: boolean;
  }>(),
  { loading: false },
);

defineEmits<{
  (e: 'submit', formData: { username: string; password: string }): void;
}>();
const { t } = useI18n();
const rememberMeInStorage = useLocalStorage(
  `${import.meta.env.VITE_APP_NAMESPACE}_${CacheEnum.LOGIN_REMEMBER_ME}`,
  false,
);
const usernameInStorage = useLocalStorage(
  `${import.meta.env.VITE_APP_NAMESPACE}_${CacheEnum.LOGIN_USERNAME}`,
  '',
);

const formData = reactive({
  username: rememberMeInStorage.value ? usernameInStorage.value || '' : '',
  password: '',
});

const formRef = ref<FormInstance>();
const rememberMe = ref(rememberMeInStorage.value ?? false);

watch(
  () => rememberMe.value,
  val => {
    rememberMeInStorage.value = val;
  },
);

watch(
  () => formData.username,
  val => {
    if (rememberMe.value) {
      usernameInStorage.value = val;
    }
  },
);
</script>

<template>
  <a-form
    class="login-form"
    ref="formRef"
    :model="formData"
    @finish="$emit('submit', formData)"
  >
    <a-form-item
      name="username"
      :rules="[{ required: true, message: t('authentication.usernameTip') }]"
    >
      <a-input
        v-model:value="formData.username"
        :placeholder="t('authentication.username')"
        autocomplete="username"
        size="large"
      >
        <template #prefix>
          <user-outlined />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      name="password"
      :rules="[{ required: true, message: t('authentication.passwordTip') }]"
    >
      <a-input-password
        v-model:value="formData.password"
        :placeholder="t('authentication.password')"
        autocomplete="password"
        size="large"
        visiblity-toggle
      >
        <template #prefix>
          <lock-outlined />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-checkbox v-model:checked="rememberMe" size="small">{{
        t('authentication.rememberMe')
      }}</a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        size="large"
        :loading="loading"
        block
        >{{ t('common.login') }}</a-button
      >
    </a-form-item>
  </a-form>
</template>
