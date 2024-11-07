<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { UserOutlined } from '@ant-design/icons-vue';

defineOptions({ name: 'LayoutHeader' });

const userStore = useUserStore();
const { t } = useI18n();
</script>

<template>
  <a-row>
    <a-col :span="20">
      <slot></slot>
    </a-col>
    <a-col :span="4" class="header-right">
      <a-menu mode="horizontal" :selectable="false" class="header-menu">
        <a-menu-item>
          <language-toggle />
        </a-menu-item>
        <a-menu-item>
          <a-dropdown placement="bottom" trigger="click">
            <span class="user-info">
              <a-avatar class="user-avatar" size="small">
                <template #icon><UserOutlined /></template>
              </a-avatar>
              {{ userStore.userInfo.nickname }}
            </span>
            <template #overlay>
              <a-menu @click="userStore.logout" theme="dark">
                <a-menu-item>
                  {{ t('common.logout') }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-menu-item>
      </a-menu>
    </a-col>
  </a-row>
</template>

<style lang="scss" scoped>
.header-right {
  display: flex;
  justify-content: end;
  .user-info {
    min-width: 70px;
    display: inline-block;
    .user-avatar {
      margin-right: 6px;
    }
  }
}
</style>
