<script setup lang="ts">
defineOptions({ name: 'SettingBlock' });
defineProps<{
	title?: string;
}>();
</script>

<template>
	<div class="cover-setting-drawer-block">
		<h3 class="">
			{{ title }}
		</h3>
		<slot></slot>
	</div>
</template>
