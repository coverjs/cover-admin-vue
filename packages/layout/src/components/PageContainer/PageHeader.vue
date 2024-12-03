<script setup lang="ts">
import type { PageContainerProps } from './types';
import { useAntdToken } from '@lakyjs/components-vue-hooks';
import { VnodeRender } from '@lakyjs/components-vue-utils';

import { Breadcrumb, BreadcrumbItem, Space } from 'ant-design-vue';
import useConfigInject from 'ant-design-vue/es/config-provider/hooks/useConfigInject';

import { isArray } from 'lodash-es';
import { getStyle } from './style';

defineOptions({ name: 'PageHeader' });

const props = defineProps<PageContainerProps['header']>();

const { prefixCls } = useConfigInject('page', props);
const { token } = useAntdToken();
</script>

<template>
  <breadcrumb
    v-if="breadcrumb"
    :class="`${prefixCls}-breadcrumb`"
    :style="getStyle(token, 'breadcrumb')"
  >
    <breadcrumb-item v-for="item in breadcrumb.items" :key="item.path">
      {{ item.title }}
    </breadcrumb-item>
  </breadcrumb>
  <div
    :class="`${prefixCls}-header-heading`"
    :style="getStyle(token, 'header-heading')"
  >
    <div
      :class="`${prefixCls}-header-heading-left`"
      :style="getStyle(token, 'header-heading-left')"
    >
      <slot>
        <span class="cover-page-title" :style="getStyle(token, 'title')">
          {{ title }}
        </span>
      </slot>
    </div>
    <div
      :class="`${prefixCls}-header-heading-left`"
      :style="getStyle(token, 'header-heading-right')"
    >
      <slot name="extra">
        <template v-if="extra && isArray(extra)">
          <space>
            <vnode-render
              v-for="vnode in extra"
              :key="vnode?.toString()"
              :virtual-node="vnode"
            />
          </space>
        </template>
        <template v-else>
          <vnode-render v-if="extra" :virtual-node="extra" />
        </template>
      </slot>
    </div>
  </div>

  <!-- <div :class="`${prefixCls}-page-header-content`">

  </div> -->
</template>
