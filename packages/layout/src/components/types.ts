import type { Slot, VNode, VNodeChild } from 'vue';

export type VueNode = Slot | VNodeChild | VNode;

export type WithFalse<T> = T | false;
