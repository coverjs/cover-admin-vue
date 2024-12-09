<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue/es/form/index';
import type { InternalNamePath } from 'ant-design-vue/es/form/interface';

import { CacheEnum } from '@/enums';
import { genStorageKey } from '@/utils';
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import crypto from 'crypto-js';

import { cloneDeep, isEqual } from 'lodash-es';
import objHash from 'object-hash';

interface FormData {
  username: string
  password: string
}

defineOptions({ name: 'LoginForm' });

const props = withDefaults(
  defineProps<{
    loading: boolean
    securePwd?: boolean
    hashType?:
      | 'MD5'
      | 'SHA1'
      | 'SHA256'
      | 'SHA224'
      | 'SHA3'
      | 'SHA384'
      | 'SHA512'
      | 'RIPEMD160'
    initialUserHash?: string
    pwdMinLength?: number
    pwdMaxLength?: number
  }>(),
  { loading: false, securePassword: true, hashType: 'MD5', pwdMaxLength: 16, pwdMinLength: 5 },
);

defineEmits<{
  (e: 'submit', formData: FormData): void
}>();

const rememberMeInStorage = useLocalStorage(
  genStorageKey(CacheEnum.LOGIN_REMEMBER_ME),
  false,
);
const usernameInStorage = useLocalStorage(
  genStorageKey(CacheEnum.LOGIN_USERNAME),
  '',
);

const formData: FormData = reactive({
  username: rememberMeInStorage.value ? usernameInStorage.value || '' : '',
  password: '',
});

const formRef = ref<FormInstance>();
const rememberMe = ref(rememberMeInStorage.value ?? false);

function getFieldsValue(nameList?: InternalNamePath[] | true) {
  const result = cloneDeep(formRef.value?.getFieldsValue(nameList));
  const shouldEncryptPwd
    = !isEqual(objHash(formData), props.initialUserHash ?? '')
    && props.securePwd
    && result?.password;

  if (shouldEncryptPwd) {
    result.password = crypto[props.hashType]?.(result.password)?.toString();
  }

  return result as FormData;
}

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

defineExpose({
  getFieldsValue,
});
</script>

<template>
  <a-form
    ref="formRef"
    class="login-form"
    :model="formData"
    @finish="$emit('submit', getFieldsValue())"
  >
    <a-form-item
      name="username"
      :rules="[{ required: true, message: $t('authentication.usernameTip') }]"
    >
      <a-input
        v-model:value="formData.username"
        :placeholder="$t('authentication.username')"
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
      :rules="[
        { required: true, message: $t('authentication.passwordTip') },
        {
          max: pwdMaxLength,
          min: pwdMinLength,
          message: $t('authentication.passwordLength', { max: pwdMaxLength, min: pwdMinLength }),
        },
      ]"
    >
      <a-input-password
        v-model:value="formData.password"
        :placeholder="$t('authentication.password')"
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
      <a-checkbox v-model:checked="rememberMe" size="small">
        {{
          $t('authentication.rememberMe')
        }}
      </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        size="large"
        :loading="loading"
        block
      >
        {{ $t('common.login') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>
