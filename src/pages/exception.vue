<script setup lang="ts">
defineOptions({
  name: "ExceptionPage",
});
const route = useRoute();
</script>

<template>
  <fallback-page :status="Number(route.query.status ?? 403)" />
</template>
