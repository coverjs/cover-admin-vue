<script setup lang="ts">
defineOptions({ name: 'LoginLayout' });
</script>

<template>
	<div class="login-container">
		<router-view></router-view>
	</div>
</template>

<style lang="scss" scoped>
.login-container {
	min-height: 100%;
	min-width: 100%;
	padding-top: 40px;
	background: var(--bg-color-container);
}
</style>
