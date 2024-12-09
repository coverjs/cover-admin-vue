<script setup lang="ts">
import { DownOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { Dropdown as AntDropdown, theme } from 'ant-design-vue';
import { isEmpty, last, split } from 'lodash-es';
import { computed, ref } from 'vue';
import { type RouteRecordRaw, useRoute } from 'vue-router';
import { useConfig } from '../ConfigProvider';
import { REDIRECT_NAME } from '../PageRedirect';

defineOptions({
  name: 'LakyBreadcrumb',
});

const route = useRoute();
const config = useConfig();
const { token } = theme.useToken();

const textColor = ref(token.value.colorText);
const textDisabledColor = ref(token.value.colorTextDisabled);

const showBreadcrumb = computed(() => route.name !== REDIRECT_NAME as unknown);

const breadcrumbList = computed(() =>
  route.matched.filter(item => item.meta?.title),
);

function genMenuItems(children: RouteRecordRaw[]) {
  return children.map(item => ({
    title: genItemTitle(item),
    locale: (item.meta?.locale as string) ?? '',
    key: item.path,
  }));
}

function genItemTitle(item: RouteRecordRaw) {
  if (item.meta?.locale && !isEmpty(item.meta?.locale) && config?.t) {
    return config.t(item.meta.locale as string);
  }
  if (item.meta?.title && !isEmpty(item.meta.title)) {
    return item.meta.title;
  }
  return last(split(item.path, '/'));
}

function isLastItem(idx: number) {
  return idx === breadcrumbList.value.length - 1;
}
</script>

<template>
  <div class="breadcrumb-container">
    <ol class="breadcrumb">
      <transition-group name="breadcrumb">
        <loading-outlined v-if="!showBreadcrumb" />
        <template
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
        >
          <li
            v-show="showBreadcrumb"
            class="breadcrumb-item"
            :class="{ 'breadcrumb-item-last': isLastItem(index) }"
          >
            <ant-dropdown>
              <span class="breadcrumb-item__title" :class="{ disabled: isLastItem(index) }">
                <router-link :to="item.path">
                  {{ genItemTitle(item) }}
                </router-link>
                <down-outlined v-if="item.children.length > 1" style="margin-inline-start: 4px;width: 12px;height: 12px;" />
              </span>
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
            </ant-dropdown>
            <span v-if="!isLastItem(index)" style="margin-inline:8px;">/</span>
          </li>
        </template>
      </transition-group>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-container{
  display: inline-block;
  margin-left: 20px;
  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;

    .breadcrumb-item__title, .breadcrumb-item__title>a{
      color: v-bind(textColor);
      cursor: pointer;
      &:hover{
        color: v-bind(textDisabledColor);
      }
    }

    .breadcrumb-item-last {
      .breadcrumb-item__title, .breadcrumb-item__title>a{
        color: v-bind(textDisabledColor) !important;
        cursor: default;
      }
    }

  }
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
