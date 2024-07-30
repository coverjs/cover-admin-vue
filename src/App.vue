<script setup lang="ts">
import LayoutControl from "./layouts/index.vue";
defineOptions({
  name: "App",
});
</script>

<template>
  <layout-control>
    <router-view />
  </layout-control>
</template>
