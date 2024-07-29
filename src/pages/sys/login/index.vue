<script setup lang="ts">
import LoginForm from "./LgoinForm.vue";
</script>

<template>
  <div class="login-container">
    <div class="login-form-container">
      <a-typography class="title-container">
        <a-typography-title class="title" :level="3"
          >用户登录</a-typography-title
        >
      </a-typography>
      <LoginForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$bgColor: #f0f2f5;
.login-container {
  min-height: 100%;
  min-width: 100%;
  padding-top: 40px;
  background-color: $bgColor;
  .login-form-container {
    width: 300px;
    margin: auto;
  }
}
</style>
