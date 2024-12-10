<script setup lang="ts">
import * as icons from '@ant-design/icons-vue';
import { isFunction } from 'lodash-es';
import { computed, type VNodeChild } from 'vue';

defineOptions({
  name: 'AsyncIcon',
});

const props = defineProps<{
  icon: string | ((...args: any[]) => VNodeChild) | void
}>();
const Comp = computed(() => {
  if (!props.icon)
    return void 0;
  if (isFunction(props.icon)) {
    const node = props.icon();
    if (node)
      return node;
  }
  else {
    return (icons as any)[props.icon];
  }
  return void 0;
});
</script>

<template>
  <component :is="Comp" v-if="icon" />
</template>
