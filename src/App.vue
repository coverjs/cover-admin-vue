<script setup lang="ts">
import { useUserStore } from "@/store/user";

defineOptions({
  name: "App",
});

const userStore = useUserStore();

onMounted(() => {
  userStore.getUserInfoAction();
});
</script>

<template>
  <router-view />
</template>
