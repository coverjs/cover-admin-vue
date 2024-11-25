<script setup lang="ts">
import { ExpandOutlined, CompressOutlined } from '@ant-design/icons-vue';

const { toggle, isFullscreen } = useFullscreen();
</script>

<template>
	<span @click="toggle()">
		<expand-outlined v-if="!isFullscreen" />
		<compress-outlined v-else />
	</span>
</template>
