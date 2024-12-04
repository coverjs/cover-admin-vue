import type { TabsProps } from 'ant-design-vue';
import type { VueNode, WithFalse } from '../../types';

export interface PageContainerProps {
  tablist?: {
    key: string
    tab: string | VueNode
    disabled?: boolean
    closable?: boolean
  }[]
  tabActiveKey?: string
  tabBarExtra?: VueNode
  tabProps?: TabsProps
  header?: {
    title: string | VueNode
    subTitle?: string | VueNode
    extra?: VueNode[] | VueNode
    breadcrumb: WithFalse<{
      items: { path: string, title: string }[]
    }>
  }
  content?: VueNode
}

export interface PageContainerSlots {
  tabBarExtra: () => VueNode
  header: () => VueNode
  headerExtra: () => VueNode
  default: () => VueNode
}

export interface PageContainerEmits {
  (e: 'tabChange', key: string | number): void
}
