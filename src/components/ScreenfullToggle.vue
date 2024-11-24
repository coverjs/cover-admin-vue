<script setup lang="ts">
import { CompressOutlined, ExpandOutlined } from '@ant-design/icons-vue'
import screenfull from 'screenfull'

const isFullScreen = ref(false)

function changeListener() {
  isFullScreen.value = screenfull.isFullscreen
}

onMounted(() => {
  screenfull.on('change', changeListener)
})

onUnmounted(() => {
  screenfull.off('change', changeListener)
})
</script>

<template>
  <span @click="screenfull.toggle()">
    <ExpandOutlined v-if="!isFullScreen" />
    <CompressOutlined v-else />
  </span>
</template>
