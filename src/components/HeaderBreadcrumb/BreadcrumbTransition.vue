<script setup lang="ts">
defineOptions({ name: 'BreadcrumbItems' });
defineProps<{
  useTransition: boolean;
}>();
</script>

<template>
  <transition-group name="breadcrumb" v-if="useTransition">
    <slot></slot>
  </transition-group>
  <slot v-else></slot>
</template>

<style lang="scss">
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from {
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
  display: none;
}
</style>
