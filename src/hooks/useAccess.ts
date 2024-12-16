import { useUserStore } from '@/store';
import { isArray } from 'lodash-es';

export function useAccess() {
  const userStore = useUserStore();
  const roles = computed(() => userStore.roles);
  const hasAccess = (value: string | string[]) => {
    const roleArr = isArray(value) ? value.flat(1) : [value];
    return roleArr.some(role => roles.value?.includes(role));
  };
  return {
    hasAccess,
    roles,
  };
}
