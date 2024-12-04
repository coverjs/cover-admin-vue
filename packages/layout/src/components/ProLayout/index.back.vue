<script setup lang="tsx">
import type { VNode } from 'vue';
import type { ProlayoutEmits, ProLayoutProps } from './types';
import { Layout } from 'ant-design-vue';

import Footer from '../Footer.vue';

defineOptions({ name: 'ProLayout' });

defineProps<ProLayoutProps>();

defineEmits<ProlayoutEmits>();

const slots = defineSlots<{
  default: () => VNode
  footer: (param: {
    layoutProps: ProLayoutProps
    defaultFooter: VNode
  }) => VNode
}>();

const { Header, Sider } = Layout;

function headerRender(props: ProLayoutProps & { hasSiderMenu: boolean }) {
  if (props.headerRender === false || props.pure) {
    return void 0;
  }
  return <Header hasSider={props.hasSiderMenu} />;
}

function footerRender(props: ProLayoutProps) {
  if (props.footerRender === false || props.pure) {
    return void 0;
  }

  if (slots.footer) {
    return slots.footer({
      layoutProps: { ...props },
      defaultFooter: <Footer copyright="copyright" />,
    });
  }

  if (props.footerRender) {
    return props.footerRender({ ...props }, <Footer copyright="版权所有" />);
  }

  return void 0;
}

function siderMenuRender(props: ProLayoutProps) {
  // const {} = props;
  return <Sider {...props} />;
}

function BaseLayout(props: ProLayoutProps) {
  return props.pure
    ? (
      slots?.default?.()
    )
    : (
      <div
        class={[
          props.className,
          'cover-pro-layout',
          { 'cover-pro-layout-has-header': props.headerRender },
        ]}
      >
        <Layout
          style={{
            minHeight: '100%',
            minWidth: '100%',
          }}
        >
          {siderMenuRender(props)}
          <Layout>
            {headerRender({ ...props, hasSiderMenu: !!siderMenuRender(props) })}
            {slots?.default?.()}
            {footerRender(props)}
          </Layout>
        </Layout>
      </div>
    );
}
</script>

<template>
  <base-layout v-bind="$props" />
</template>
