<script setup lang="ts">
import { Button as AntButton, Result as AntResult } from 'ant-design-vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { type GlobalConfig, useConfig } from '../ConfigProvider';

defineOptions({ name: 'FallbackPage' });

const props = defineProps<{
  status: 403 | 404 | 500 | 0
  homePath: string
}>();

const router = useRouter();
const { t } = useConfig() as GlobalConfig;

const titleMap = new Map([
  [403, () => t('fallback.forbidden')],
  [404, () => t('fallback.pageNotFound')],
  [500, () => t('fallback.internalError')],
]);

const descMap = new Map([
  [403, () => t('fallback.forbiddenDesc')],
  [404, () => t('fallback.pageNotFoundDesc')],
  [500, () => t('fallback.internalErrorDesc')],
]);

const title = computed(() => titleMap.get(props.status)?.() ?? 'Error');

const subTitle = computed(() => descMap.get(props.status)?.() ?? '');
const _status = computed(() => {
  if (props.status === 0)
    return void 0;
  return props.status;
});

function backHome() {
  router.replace(props.homePath);
}
</script>

<template>
  <ant-result
    v-if="_status"
    :status="_status"
    :title="title"
    :sub-title="subTitle"
  >
    <template #extra>
      <ant-button type="primary" @click="backHome">
        {{ t('common.backToHome') }}
      </ant-button>
    </template>
  </ant-result>
  <slot v-else />
</template>
