<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { useMessage } from "@/hooks";
import { AccountLoginDto } from "@/services/http";
import LoginForm from "./components/LgoinForm.vue";

defineOptions({ name: "LoginPage" });

const submitLoading = ref(false);

const userStore = useUserStore();
const { notification } = useMessage();
async function onSubmit(formData: { username: string; password: string }) {
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
  <div class="login-form-container">
    <a-typography class="title-container">
      <a-typography-title class="title" :level="3">用户登录</a-typography-title>
    </a-typography>
    <LoginForm :loading="submitLoading" @submit="onSubmit" />
  </div>
</template>

<style lang="scss" scoped>
.login-form-container {
  width: 300px;
  margin: auto;
}
</style>

<route lang="yml">
name: login
meta:
  layout: login
  ignoreAuth: true
</route>
