<script setup lang="ts">
defineOptions({
  name: "ForbiddenPage",
});
</script>

<template>
  <exception-page
    :status="403"
    title="403"
    sub-title="Sorry, you are not authorized to access this page."
  />
</template>
