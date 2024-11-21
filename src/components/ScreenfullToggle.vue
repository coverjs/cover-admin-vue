<script setup lang="ts">
import screenfull from 'screenfull';
import { ExpandOutlined, CompressOutlined } from '@ant-design/icons-vue';

const isFullScreen = ref(false);

function changeListener() {
  isFullScreen.value = screenfull.isFullscreen;
}

onMounted(() => {
  screenfull.on('change', changeListener);
});

onUnmounted(() => {
  screenfull.off('change', changeListener);
});
</script>

<template>
  <span @click="screenfull.toggle()">
    <expand-outlined v-if="!isFullScreen" />
    <compress-outlined v-else />
  </span>
</template>
