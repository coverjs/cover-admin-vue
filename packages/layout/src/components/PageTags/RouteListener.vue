<script setup lang="ts">
import type { Component, VNode } from 'vue';
import type { RouteLocation, RouteLocationNormalizedLoaded } from 'vue-router';
import { watch } from 'vue';

import { useStore } from './useStore';

defineOptions({ name: 'RouteListener' });

const props = defineProps<{
  routeProps: {
    Component: VNode
    route: RouteLocationNormalizedLoaded
  }
}>();

const store = useStore();

const blackList = ['/', '/login'];

function genTitle(route: RouteLocation) {
  return route.meta?.title as string;
}

watch(() => props.routeProps.route, to => {
  const title = genTitle(to);

  if (blackList.includes(to.path) || !title)
    return;

  if (to.path.includes('/redirect'))
    return;

  const { fullPath, meta, params, path, query } = to;
  store.addTag({
    name: (props.routeProps.Component?.type as Component)?.name ?? to.name as string,
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
  <slot :include="store.getCacheTags.value" :component-key="routeProps.route.fullPath">
    <!-- renderless 组件 -->
  </slot>
</template>
