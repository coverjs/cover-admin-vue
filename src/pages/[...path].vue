<script setup lang="ts">
defineOptions({
  name: "NotFoundPage",
});
</script>

<template>
  <exception-page
    :status="404"
    title="404"
    sub-title="Sorry, you are not authorized to access this page."
  />
</template>
