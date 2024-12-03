<script setup lang="ts">
import { Spin, type SpinProps } from 'ant-design-vue';

defineOptions({ name: 'PageLoading' });

defineProps<SpinProps & any>();
</script>

<template>
  <div style="padding-block-start: 100; text-align: center">
    <spin size="large" v-bind="$props" />
  </div>
</template>
