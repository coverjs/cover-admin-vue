<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'SvgIcon',
});
const props = withDefaults(defineProps<{
  name: string
  prefix?: string
}>(), {
  prefix: 'ant-design',
});

const iconName = computed(() => {
  if (!props.name) {
    return void 0;
  }
  return `i-${props.prefix}:${props.name}`;
});
</script>

<template>
  <div class="text-base" :class="[iconName]" />
</template>
