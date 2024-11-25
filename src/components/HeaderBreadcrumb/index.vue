<script setup lang="tsx">
import type { RouteRecordRaw } from 'vue-router';

import { loadEnv } from '@/utils';

import { last, split, isEmpty } from 'lodash-es';

defineOptions({
	name: 'HeaderBreadcrumb',
});

const route = useRoute();
const { t } = useI18n();

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
	if (item.meta?.locale && !isEmpty(item.meta?.locale)) {
		return t(item.meta.locale as string);
	}
	if (item.meta?.title && !isEmpty(item.meta.title)) {
		return item.meta.title;
	}
	return last(split(item.path, '/'));
}
</script>

<template>
	<a-breadcrumb class="header-breadcrumb">
		<transition-group name="breadcrumb" v-if="loadEnv().PROD">
			<template v-for="(item, index) in breadcrumbList" :key="item.path">
				<a-breadcrumb-item v-if="index === breadcrumbList.length - 1">{{
					genItemTitle(item)
				}}</a-breadcrumb-item>
				<a-breadcrumb-item :href="item.path" v-else>
					{{ genItemTitle(item) }}
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
		<!-- todo 自己实现一个面包屑 父级组件 -->
		<template v-else>
			<template v-for="(item, index) in breadcrumbList" :key="item.path">
				<a-breadcrumb-item v-if="index === breadcrumbList.length - 1">{{
					genItemTitle(item)
				}}</a-breadcrumb-item>
				<a-breadcrumb-item :href="item.path" v-else>
					{{ genItemTitle(item) }}
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
		</template>
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
