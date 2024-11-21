<script setup lang="ts">
import welcomImg from '@/assets/welcome.png';
defineOptions({
  name: 'HomePage',
});
</script>

<template>
  <div>
    <img class="welcom-img" :src="welcomImg" alt="welcomImg" />
  </div>
</template>

<style lang="scss" scoped>
.welcom-img {
  width: 100%;
}
</style>
