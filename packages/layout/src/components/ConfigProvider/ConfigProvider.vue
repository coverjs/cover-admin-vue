<script setup lang="ts">
import type { GlobalConfig } from './types';

import { ConfigProvider } from 'ant-design-vue';
import { provide } from 'vue';
import { CONFIG_CTX_KEY } from './constants';

defineOptions({ name: 'LakyConfigProvider' });

const props = defineProps<GlobalConfig>();

provide(CONFIG_CTX_KEY, props);
</script>

<template>
  <config-provider :locale="locale" :theme="theme">
    <slot />
  </config-provider>
</template>

