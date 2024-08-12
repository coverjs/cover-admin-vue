<script setup lang="ts">
defineOptions({
  name: "ExceptionPage",
});

defineProps<{
  status: 403 | 404 | 500;
  title: string;
  subTitle: string;
}>();

const router = useRouter();

function backHome() {
  router.replace("/");
}
</script>

<template>
  <a-result :status="status" :title="title" :sub-title="subTitle">
    <template #extra>
      <a-button type="primary" @click="backHome">Back Home</a-button>
    </template>
  </a-result>
</template>
