const APPEND_ORDER = 'data-vc-order';
const MARK_KEY = 'vc-util-key';

const containerCache = new Map<ContainerType, Node & ParentNode>();

export type ContainerType = Element | ShadowRoot;
export type Prepend = boolean | 'queue';
export type AppendType = 'prependQueue' | 'append' | 'prepend';

interface Options {
  attachTo?: ContainerType
  csp?: { nonce?: string }
  prepend?: Prepend
  mark?: string
  styles?: HTMLElement[]
}

/**
 * 检查是否可以使用 DOM
 */
export function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/**
 *  检查节点是否包含另一个节点
 * @param root  根节点
 * @param n 节点
 * @returns 是否包含
 */
export default function contains(root: Node | null | undefined, n?: Node) {
  if (!root)
    return false;

  if (root.contains)
    return root.contains(n as any);

  let node: any = n;
  while (node) {
    if (node === root)
      return true;

    node = node.parentNode;
  }

  return false;
}

/**
 * 获取标记
 * @param option 选项
 * @param option.mark 标记
 * @returns 标记
 */
function getMark({ mark }: Options = {}) {
  if (mark) {
    return mark.startsWith('data-') ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}

function getContainer(option: Options) {
  if (option.attachTo) {
    return option.attachTo;
  }

  const head = document.querySelector('head');
  return head || document.body;
}

function getOrder(prepend?: Prepend): AppendType {
  if (prepend === 'queue') {
    return 'prependQueue';
  }

  return prepend ? 'prepend' : 'append';
}

/**
 * Find style which inject by rc-util
 */
function findStyles(container: ContainerType) {
  return Array.from(
    (containerCache.get(container) || container).children,
  ).filter(node => node.tagName === 'STYLE') as HTMLStyleElement[];
}

export function injectCSS(css: string, option: Options = {}) {
  if (!canUseDom())
    return null;

  const { csp, prepend } = option;

  const styleNode = document.createElement('style');
  styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));

  if (csp?.nonce)
    styleNode.nonce = csp?.nonce;

  styleNode.innerHTML = css;

  const container = getContainer(option);
  const { firstChild } = container;

  if (prepend) {
    // If is queue `prepend`, it will prepend first style and then append rest style
    if (prepend === 'queue') {
      const existStyle = findStyles(container).filter(node =>
        ['prepend', 'prependQueue'].includes((node as any).getAttribute(APPEND_ORDER)),
      );
      if (existStyle.length) {
        container.insertBefore(
          styleNode,
          existStyle[existStyle.length - 1].nextSibling,
        );

        return styleNode;
      }
    }

    // Use `insertBefore` as `prepend`
    container.insertBefore(styleNode, firstChild);
  }
  else {
    container.appendChild(styleNode);
  }

  return styleNode;
}

function findExistNode(key: string, option: Options = {}) {
  const container = getContainer(option);

  return (option.styles || findStyles(container)).find(
    node => node.getAttribute(getMark(option)) === key,
  );
}

export function removeCSS(key: string, option: Options = {}) {
  const existNode = findExistNode(key, option);
  if (existNode) {
    const container = getContainer(option);
    container.removeChild(existNode);
  }
}

/**
 * qiankun will inject `appendChild` to insert into other
 */
function syncRealContainer(container: ContainerType, option: Options) {
  const cachedRealContainer = containerCache.get(container);

  // Find real container when not cached or cached container removed
  if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
    const placeholderStyle = injectCSS('', option);
    const { parentNode } = placeholderStyle as any;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle as any);
  }
}

/**
 * manually clear container cache to avoid global cache in unit testes
 */
export function clearContainerCache() {
  containerCache.clear();
}

export function updateCSS(
  css: string,
  key: string,
  originOption: Options = {},
) {
  const container = getContainer(originOption);
  const styles = findStyles(container);
  const option = { ...originOption, styles };

  // Sync real parent
  syncRealContainer(container, option);

  const existNode = findExistNode(key, option);

  if (existNode) {
    if (option.csp?.nonce && existNode.nonce !== option.csp?.nonce) {
      existNode.nonce = option.csp?.nonce;
    }

    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }

    return existNode;
  }

  const newNode: any = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}
