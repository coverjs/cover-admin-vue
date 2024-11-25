<script lang="ts" setup>
import { useLogoutConfirm } from '@/hooks';
import { useUserStore } from '@/store';
import { UserOutlined } from '@ant-design/icons-vue';

defineOptions({ name: 'LayoutHeader' });

const userStore = useUserStore();
const logout = useLogoutConfirm('manual');
const { t } = useI18n();
</script>

<template>
  <div class="header-action-container">
    <a-menu mode="horizontal" :selectable="false" class="header-menu">
      <a-menu-item>
        <screenfull-toggle />
      </a-menu-item>
      <a-menu-item>
        <color-mode-toggle />
      </a-menu-item>
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
            <a-menu theme="dark">
              <a-menu-item @click="logout">
                {{ t('common.logout') }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style lang="scss" scoped>
.header-action-container {
  display: flex;
  justify-content: end;
  align-items: center;
  .dark-mode-switch {
    margin-right: 20px;
  }
  .header-menu {
    .user-info {
      min-width: 70px;
      display: inline-block;

      .user-avatar {
        margin-right: 6px;
      }
    }
  }
}
</style>
