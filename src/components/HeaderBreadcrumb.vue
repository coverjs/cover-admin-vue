<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const breadcrumbList = computed(() =>
  route.matched.filter(item => item.meta?.title),
);

function genMenuItems(children: RouteRecordRaw[]) {
  return children.map(item => ({
    title: item.meta?.title,
    key: item.path,
  }));
}
</script>

<template>
  <a-breadcrumb class="header-breadcrumb">
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in breadcrumbList" :key="item.path">
        <a-breadcrumb-item v-if="index === breadcrumbList.length - 1">{{
          item.meta?.title
        }}</a-breadcrumb-item>
        <a-breadcrumb-item :href="item.path" v-else
          >{{ item.meta.title }}
          <template v-if="item.children.length > 1" #overlay>
            <a-menu :selected-keys="[$route.path]">
              <a-menu-item
                v-for="menuItem in genMenuItems(item.children)"
                :key="menuItem.key"
                @click="() => $router.push(menuItem.key)"
              >
                {{ menuItem.title }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-breadcrumb-item>
      </template>
    </transition-group>
  </a-breadcrumb>
</template>

<style lang="scss" scoped>
.header-breadcrumb {
  display: inline-block;
  margin-left: 20px;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from {
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
  display: none;
}
</style>
