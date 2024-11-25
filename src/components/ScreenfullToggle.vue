<script setup lang="ts">
import { CompressOutlined, ExpandOutlined } from '@ant-design/icons-vue';

const { toggle, isFullscreen } = useFullscreen();
</script>

<template>
  <span @click="toggle()">
    <ExpandOutlined v-if="!isFullscreen" />
    <CompressOutlined v-else />
  </span>
</template>
