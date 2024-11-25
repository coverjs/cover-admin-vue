<script setup lang="ts">
defineOptions({
	name: 'NotFoundPage',
});
</script>

<template>
	<fallback-page :status="404" />
</template>
