<script setup lang="ts">
import type { Component, VNode } from 'vue';
import type { RouteLocation } from 'vue-router';

import { useAppStore } from '@/store';

defineOptions({ name: 'PageRouteListener' });

const props = defineProps<{
  component: VNode
  route: RouteLocation
}>();

const appStore = useAppStore();

const blackList = ['/', '/login'];

function genTitle(route: RouteLocation) {
  return route.meta?.title;
}

watch(() => props.route, to => {
  const title = genTitle(to);

  if (blackList.includes(to.path) || !title)
    return;

  if (to.path.includes('/redirect'))
    return;

  const { fullPath, meta, params, path, query } = to;
  appStore.addTag({
    name: (props.component?.type as Component)?.name ?? to.name,
    title,
    path,
    fullPath,
    meta,
    params,
    query
  });
}, {
  immediate: true,
});
</script>

<template>
  <slot :include="appStore.getCacheTags" :component-key="route.fullPath">
    <!-- renderless 组件 -->
  </slot>
</template>
