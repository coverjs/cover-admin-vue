<script setup lang="ts">
defineOptions({
  name: "FallbackPage",
});

const props = defineProps<{
  status: 403 | 404 | 500;
}>();

const router = useRouter();
const { t } = useI18n();

const titleMap = new Map([
  [403, () => t("fallback.forbidden")],
  [404, () => t("fallback.pageNotFound")],
  [500, () => t("fallback.internalError")],
]);

const descMap = new Map([
  [403, () => t("fallback.forbiddenDesc")],
  [404, () => t("fallback.pageNotFoundDesc")],
  [500, () => t("fallback.internalErrorDesc")],
]);

const title = computed(() => titleMap.get(props.status)?.() ?? "Error");

const subTitle = computed(() => descMap.get(props.status)?.() ?? "");

function backHome() {
  router.replace("/");
}
</script>

<template>
  <a-result :status="status" :title="title" :sub-title="subTitle">
    <template #extra>
      <a-button type="primary" @click="backHome">{{
        t("common.backToHome")
      }}</a-button>
    </template>
  </a-result>
</template>
