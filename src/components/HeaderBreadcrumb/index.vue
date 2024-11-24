<script setup lang="tsx">
import type { RouteRecordRaw } from 'vue-router'

import { loadEnv } from '@/utils'

// antd 的面包屑 在 <a-breadcrumb> 中加动画会报 warn
// a-breadcrumb 给 children 加的属性这里的使用场景用不到,所以正式环境可以加上动画 忽略 warn (坏笑~)
import BreadcrumbTransition from './BreadcrumbTransition.vue'

defineOptions({
  name: 'HeaderBreadcrumb',
})

const route = useRoute()

const breadcrumbList = computed(() =>
  route.matched.filter(item => item.meta?.title),
)

function genMenuItems(children: RouteRecordRaw[]) {
  return children.map(item => ({
    title: item.meta?.title,
    key: item.path,
  }))
}
</script>

<template>
  <a-breadcrumb class="header-breadcrumb">
    <BreadcrumbTransition :use-transition="loadEnv().PROD">
      <template v-for="(item, index) in breadcrumbList" :key="item.path">
        <a-breadcrumb-item v-if="index === breadcrumbList.length - 1">
          {{
            item.meta?.title
          }}
        </a-breadcrumb-item>
        <a-breadcrumb-item v-else :href="item.path">
          {{ item.meta.title }}
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
    </BreadcrumbTransition>
  </a-breadcrumb>
</template>

<style lang="scss" scoped>
.header-breadcrumb {
  display: inline-block;
  margin-left: 20px;
}
</style>
