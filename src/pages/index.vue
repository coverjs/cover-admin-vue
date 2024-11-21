<script setup lang="ts">
import welcomeImg from '@/assets/welcome.png';
defineOptions({
  name: 'PageIndex',
});
</script>

<template>
  <div>
    <img class="welcome-img" :src="welcomeImg" alt="welcomeImg" />
  </div>
</template>

<style lang="scss" scoped>
.welcome-img {
  width: 100%;
}
</style>
