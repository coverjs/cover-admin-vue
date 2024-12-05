<script setup lang="tsx">
import type { JSX } from 'vue/jsx-runtime';
import type { WithFalse } from '../types';
import { CopyrightOutlined } from '@ant-design/icons-vue';

// import { Layout } from 'ant-design-vue';
import { type CSSProperties, Fragment } from 'vue';

interface FooterProps {
  links?: WithFalse<
    Array<{
      key?: string
      title: string
      href: string
      blankTarget?: boolean
    }>
  >
  copyright?: WithFalse<string | JSX.Element>
  style?: CSSProperties
  className?: string
  prefixCls?: string
}

defineOptions({ name: 'DefaultFooter' });
const props = defineProps<FooterProps>();

// const { Footer } = Layout;
function GlobalFooter({
  className,
  prefixCls,
  links,
  copyright,
  style,
}: FooterProps) {
  if (
    // links == null ||
    // links === false ||
    Array.isArray(links)
    && links.length === 0
    && (copyright === null || copyright === void 0 || copyright === false)
  ) {
    return void 0;
  }

  return (
    <div class={className} style={style}>
      {links && (
        <div class={`${prefixCls}-links`}>
          {links.map(link => (
            <a
              class={`${prefixCls}-link`}
              key={link.key}
              title={link.title}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div class={`${prefixCls}-copyright`}>{copyright}</div>}
    </div>
  );
}

const _copyright
  = props.copyright === false
    ? (
      false
    )
    : (
      <Fragment>
        <CopyrightOutlined />
        {' '}
        {props.copyright}
      </Fragment>
    );
</script>

<template>
  <footer :class="className" :style="{ padding: 0, ...style }">
    <global-footer
      :links="links"
      :prefix-cls="prefixCls"
      :copyright="_copyright"
    />
  </footer>
</template>
