<script lang="ts" setup>
import { get } from 'lodash-es';
import { unref } from 'vue';
import { useRouter } from 'vue-router';

const { currentRoute, replace } = useRouter();

const { params, query } = unref(currentRoute);
const path = get(params, 'path')!;

Reflect.deleteProperty(params, '_redirect_type');
Reflect.deleteProperty(params, 'path');

const _path = Array.isArray(path) ? path.join('/') : path;

if (get(params, '_redirect_type', 'path') as string === 'name') {
  replace({
    name: _path as any,
    query,
    params: JSON.parse(get(params, '_origin_params') ?? '{}'),
  });
}
else {
  replace({
    path: _path.startsWith('/') ? _path : `/${_path}`,
    query,
  });
}
</script>

<template>
  <div>
    <!-- 跳转中 -->
  </div>
</template>

<route lang="yaml">
name: Redirect
meta:
  ignoreAuth: true
</route>
