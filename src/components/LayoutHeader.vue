<script setup lang="ts">
import { useUserStore } from "@/store/user";

defineOptions({ name: "LayoutHeader" });

const userStore = useUserStore();
</script>

<template>
  <a-row>
    <a-col :span="20">title</a-col>
    <a-col :span="4" class="align-end">
      <a-dropdown>
        <span>
          {{ userStore.userInfo.nickname }}
        </span>
        <template #overlay>
          <a-menu @click="userStore.logout">
            <a-menu-item>
              <a href="javascript::void;">logout</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<style lang="scss" scoped>
.align-end {
  text-align: end;
}
</style>
