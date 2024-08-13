<script setup lang="ts">
import { useUserStore } from "@/store/user";

defineOptions({ name: "LayoutHeader" });

const userStore = useUserStore();
const { t } = useI18n();
</script>

<template>
  <a-row>
    <a-col :span="20">
      <slot></slot>
    </a-col>
    <a-col :span="4" class="align-end">
      <a-space :size="25">
        <language-toggle />
        <a-dropdown placement="bottom">
          <span>
            {{ userStore.userInfo.nickname }}
          </span>
          <template #overlay>
            <a-menu @click="userStore.logout">
              <a-menu-item>
                {{ t("common.logout") }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-space>
    </a-col>
  </a-row>
</template>

<style lang="scss" scoped>
.align-end {
  text-align: end;
}
</style>
