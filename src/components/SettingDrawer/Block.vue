<script setup lang="ts">
defineProps<{
  title?: string
}>();
</script>

<template>
  <div class="cover-setting-drawer-block">
    <h3 class="">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>
