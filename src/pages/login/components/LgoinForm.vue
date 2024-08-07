<script setup lang="ts">
import type { FormInstance } from "ant-design-vue/lib/form/Form";
import { reactive, ref } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

defineOptions({ name: "LoginForm" });

withDefaults(
  defineProps<{
    loading: boolean;
  }>(),
  { loading: false }
);

defineEmits<{
  (e: "submit", formData: { username: string; password: string }): void;
}>();

const formData = reactive({
  username: "admin",
  password: "admin",
});

const formRef = ref<FormInstance>();
const rememberMe = ref(false);
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
      :rules="[{ required: true, message: '请输入用户名' }]"
    >
      <a-input v-model:value="formData.username" size="large">
        <template #prefix>
          <user-outlined />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      name="password"
      :rules="[{ required: true, message: '请输入密码' }]"
    >
      <a-input-password
        v-model:value="formData.password"
        size="large"
        visiblity-toggle
      >
        <template #prefix>
          <lock-outlined />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-checkbox v-model:checked="rememberMe" size="small">记住我</a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        size="large"
        :loading="loading"
        block
        >登录</a-button
      >
    </a-form-item>
  </a-form>
</template>
