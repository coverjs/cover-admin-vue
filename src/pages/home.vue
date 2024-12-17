<script setup lang="ts">
import welcomeImg from '@/assets/welcome.png';
import { LakyPageContainer } from '@lakyjs/components-vue-layout';

defineOptions({
  name: 'HomePage',
});
</script>

<template>
  <laky-page-container
    :header="{
      title: $t('menu.home.home'),
    }"
  >
    <img class="welcome-img" :src="welcomeImg" alt="welcomeImg">
  </laky-page-container>
</template>

<style lang="scss" scoped>
.welcome-img {
  width: 100%;
}
</style>
