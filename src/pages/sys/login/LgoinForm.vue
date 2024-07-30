<script setup lang="ts">
import type { FormInstance } from "ant-design-vue/lib/form/Form";
import { reactive, ref } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useUserStore } from "@/store/user";
import { useMessage } from "@/hooks";
import { AccountLoginDto } from "@/services/http";

const userStore = useUserStore();
const { notification } = useMessage();
const formData = reactive({
  username: "admin",
  password: "admin",
});

const formRef = ref<FormInstance>();
const rememberMe = ref(false);
const submitLoading = ref(false);

async function onFinish() {
  const data = {
    ...formData,
    type: "account" as AccountLoginDto["type"],
  };
  try {
    submitLoading.value = true;
    const userInfo = await userStore.login(data);
    notification.success({
      message: "登录成功",
      description: `欢迎回来，${userInfo.nickname}`,
      duration: 3,
    });
  } finally {
    submitLoading.value = false;
  }
}
</script>

<template>
  <a-form class="login-form" ref="formRef" :model="formData" @finish="onFinish">
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
        :loading="submitLoading"
        block
        >登录</a-button
      >
    </a-form-item>
  </a-form>
</template>
