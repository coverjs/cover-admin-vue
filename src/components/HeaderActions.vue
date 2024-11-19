<script lang="ts" setup>
import { useUserStore } from '@/store';
import { UserOutlined } from '@ant-design/icons-vue';
import { useLogoutConfirm } from '@/hooks';

defineOptions({ name: 'LayoutHeader' });

const userStore = useUserStore();
const logoutConfirm = useLogoutConfirm('manual');
const { t } = useI18n();
</script>

<template>
  <a-menu mode="horizontal" :selectable="false" class="header-menu">
    <a-menu-item>
      <language-toggle />
    </a-menu-item>
    <a-menu-item>
      <a-dropdown placement="bottom" trigger="click">
        <span class="user-info">
          <a-avatar class="user-avatar" size="small">
            <template #icon><user-outlined /></template>
          </a-avatar>
          {{ userStore.userInfo.nickname }}
        </span>
        <template #overlay>
          <a-menu theme="dark">
            <a-menu-item @click="logoutConfirm">
              {{ t('common.logout') }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-menu-item>
  </a-menu>
</template>

<style lang="scss" scoped>
.header-menu {
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
