import type { PropType, Slot, VNode, VNodeChild } from 'vue';
import { isFunction } from 'lodash-es';
import { defineComponent } from 'vue';

type VueNode = Slot | VNodeChild | VNode;

export const VnodeRender = defineComponent({
  props: {
    virtualNode: {
      type: [String, Object, Function] as PropType<VueNode>,
      required: true,
    },
  },
  setup: props => () =>
    isFunction(props.virtualNode) ? props.virtualNode() : props.virtualNode,
});

export * from './getSlot';
export * from './install';
export * from './style';
