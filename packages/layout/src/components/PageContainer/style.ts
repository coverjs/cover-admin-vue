import type { GlobalToken } from 'ant-design-vue/es/theme';
import type { CSSProperties } from 'vue';
import { addUnit } from '@lakyjs/components-vue-utils';

export function getStyle(token: GlobalToken, key: string) {
  const styleMap = new Map<string, CSSProperties>();

  styleMap.set('container-header', {
    paddingBlockStart: addUnit(token.paddingXS),
    paddingBlockEnd: 0,
    paddingInlineStart: addUnit(token.paddingXL),
    paddingInlineEnd: addUnit(token.paddingXL),
    // backgroundColor: token.colorBgElevated,
  });

  styleMap.set('breadcrumb', {
    paddingBlockStart: addUnit(token.paddingMD),
  });

  styleMap.set('header-heading', {
    paddingBlockStart: addUnit(token.paddingXS),
    paddingBlockEnd: addUnit(token.paddingXS),
    display: 'flex',
    justifyContent: 'space-between',
  });

  styleMap.set('header-heading-left', {
    display: 'flex',
    alignItems: 'center',
    marginBlock: addUnit(token.marginXXS),
    marginInlineEnd: 0,
    marginInlineStart: 0,
    overflow: 'hidden',
  });

  styleMap.set('header-heading-right', {
    display: 'flex',
    alignItems: 'center',
    marginBlock: addUnit(token.marginXXS),
    marginInlineEnd: 0,
    marginInlineStart: 0,
    whiteSpace: 'nowrap',
  });

  styleMap.set('title', {
    marginInlineEnd: addUnit(token.marginSM),
    marginBlockEnd: 0,
    color: token.colorText,
    fontWeight: token.fontWeightStrong,
    fontSize: addUnit(token.fontSizeHeading4),
    lineHeight: token.lineHeightHeading3,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  });

  styleMap.set('container-content', {
    paddingBlockStart: addUnit(token.paddingXS),
    paddingBlockEnd: addUnit(token.paddingXL),
    paddingInline: addUnit(token.paddingXL),
  });

  return styleMap.get(key);
}
