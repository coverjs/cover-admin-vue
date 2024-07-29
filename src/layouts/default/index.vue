<script setup lang="ts">
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar/index.vue";
import AppMain from "./AppMain.vue";

defineOptions({ name: "DafaultLayout" });
</script>

<template>
  <a-layout class="app-wrapper">
    <a-layout-sider>
      <sidebar></sidebar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff">
        <navbar></navbar>
      </a-layout-header>
      <a-layout-content>
        <app-main></app-main>
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
