<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { useRefreshPrompt } from "@/hooks";

defineOptions({
  name: "App",
});

useRefreshPrompt();

const userStore = useUserStore();

onMounted(() => {
  userStore.getUserInfoAction();
});
</script>

<template>
  <router-view />
</template>
