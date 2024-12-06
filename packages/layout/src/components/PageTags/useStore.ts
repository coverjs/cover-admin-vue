import type { Router } from 'vue-router';
import type { PageTagItem } from './types';
import { createSharedComposable } from '@vueuse/core';
import { computed, type Ref, ref, unref } from 'vue';
import { useRefreshPage } from '../PageRedirect';

export const useStore = createSharedComposable(() => {
  const tags: Ref<Array<PageTagItem>> = ref([] as PageTagItem[]);
  const cacheTags: Ref< Set<string>> = ref(new Set());

  const getCacheTags = computed(() => Array.from(cacheTags.value));

  function updateCacheTags() {
    const newSet: Set<string> = new Set();
    for (const tag of tags.value) {
      newSet.add(tag.name);
    }
    cacheTags.value = newSet;
  }

  function addTag(tag: PageTagItem) {
    const isExist = tags.value.some(item => item.path === tag.path);
    if (!isExist) {
      tags.value.push(tag);
    }
    updateCacheTags();
  }

  function removeTag(tag: PageTagItem) {
    tags.value = tags.value.filter(item => item.path !== tag.path);
    updateCacheTags();
  }

  function removeTags(target: PageTagItem[]) {
    tags.value = tags.value.filter(item => !target.includes(item));
    updateCacheTags();
  }

  function refreshTag(router: Router) {
    const { currentRoute } = router;
    const route = unref(currentRoute);
    const fullPath = route.fullPath;

    const findTab = tags.value.find(item => item.fullPath === fullPath);
    if (findTab) {
      cacheTags.value.delete(findTab.name);
    }
    const refresh = useRefreshPage(router);
    refresh();
  }

  return {
    tags,
    cacheTags,
    getCacheTags,
    addTag,
    removeTag,
    removeTags,
    refreshTag
  };
});
