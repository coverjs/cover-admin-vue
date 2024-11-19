<script setup lang="ts">
defineOptions({ name: 'DarkModeSwitch' });
const isDarkMode = useDark();
</script>

<template>
  <a-switch class="dark-mode-switch" v-model:checked="isDarkMode">
    <template #checkedChildren>dark</template>
    <template #unCheckedChildren>light</template>
  </a-switch>
</template>
