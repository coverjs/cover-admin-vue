<script setup lang="ts">
defineOptions({ name: "LoginLayout" });
</script>

<template>
  <div class="login-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
$bgColor: #f0f2f5;
.login-container {
  min-height: 100%;
  min-width: 100%;
  padding-top: 40px;
  background-color: $bgColor;
}
</style>
