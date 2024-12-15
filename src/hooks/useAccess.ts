import { useUserStore } from '@/store';
import { toArray } from 'lodash-es';

export function useAccess() {
  const userStore = useUserStore();
  const roles = computed(() => userStore.roles);
  const hasAccess = (roles: string | string[]) => {
    const accessRoles = userStore.roles;
    const roleArr = toArray(roles).flat(1);
    return roleArr.some(role => accessRoles?.includes(role));
  };
  return {
    hasAccess,
    roles,
  };
}
