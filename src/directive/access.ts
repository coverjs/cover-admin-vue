import type { App, Directive } from 'vue';
import { useAccess } from '@/hooks';

export const accessDirective: Directive = (el, binding) => {
  const { hasAccess } = useAccess();
  if (!hasAccess(binding.value))
    el.parentNode?.removeChild(el);
};
export function setupAccessDirective(app: App) {
  app.directive('access', accessDirective);
}
