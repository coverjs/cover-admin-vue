<script setup lang="ts">
import { useUserStore } from "@/store/user";
import LayoutControl from "./layouts/index.vue";
import { onMounted } from "vue";
defineOptions({
  name: "App",
});

const userStore = useUserStore();

onMounted(() => {
  userStore.getUserInfoAction();
});
</script>

<template>
  <layout-control>
    <router-view />
  </layout-control>
</template>
