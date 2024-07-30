<script setup lang="ts">
import LoginForm from "./LgoinForm.vue";
defineOptions({ name: "LoginPage" });
</script>

<template>
  <div class="login-form-container">
    <a-typography class="title-container">
      <a-typography-title class="title" :level="3">用户登录</a-typography-title>
    </a-typography>
    <LoginForm />
  </div>
</template>

<style lang="scss" scoped>
.login-form-container {
  width: 300px;
  margin: auto;
}
</style>
