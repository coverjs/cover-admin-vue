import type { Slots } from 'vue';

export function getSlot<T>(
  slots: Slots,
  props: Record<string, unknown>,
  prop = 'default'
) {
  if (props[prop] === false) {
    return void 0;
  }
  return (slots[prop]?.() || props[prop]) as T;
}
