<script setup lang="ts">
import { useRoute } from "vue-router";
import { isNil } from "lodash-es";
import { computed } from "vue";

import EmptyLayout from "./empty.vue";
import LoginLayout from "./login/index.vue";
import DefaultLayout from "./default/index.vue";

defineOptions({ name: "LayoutControl" });
const route = useRoute();

const layout = computed(() => {
  if (isNil(route.meta.loaded)) return EmptyLayout;
  if (route.meta.layout === "login") return LoginLayout;
  // 后续有定义的新  layout 可以使用卫语句加在后面

  return DefaultLayout;
});
</script>

<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>
