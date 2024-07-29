<script setup lang="ts">
import { reactive } from "vue";
import { useUserStore } from "@/store/user";
import { AccountLoginDto } from "@/services";

const userStore = useUserStore();
const formData = reactive({
  username: "admin",
  password: "admin",
});

async function onSubmit() {
  const data = {
    ...formData,
    type: "account" as AccountLoginDto["type"],
  };
  const res = await userStore.login(data);
  console.log(res);
}
</script>

<template>
  <a-form :model="formData" @submit="onSubmit">
    <a-form-item label="用户名">
      <a-input v-model:value="formData.username" />
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="formData.password" type="password" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
</template>
