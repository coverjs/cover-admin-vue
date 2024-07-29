<script setup lang="ts">
defineOptions({ name: "AppMain" });
</script>

<template>
  <div class="main-container">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  padding: 20px;
}
</style>
