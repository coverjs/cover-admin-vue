<script setup lang="ts">
defineOptions({ name: "DafaultLayout" });
</script>

<template>
  <a-layout class="app-wrapper">
    <a-layout-sider> sidebar </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff">
        <layout-header />
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
