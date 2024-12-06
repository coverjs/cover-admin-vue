import type { BreadcrumbProps } from 'ant-design-vue';
import type { VNode } from 'vue';
import type { JSX } from 'vue/jsx-runtime';
import type { WithFalse } from '../types';

export interface ProLayoutProps {
  /**
   * @name 简约模式，设置之后不渲染任何layout相关的,但有Context
   * @example pure={true}
   */
  pure?: boolean
  /**
   * @name logo 的配置，可以配置url，Vue 组件 和 false
   *
   * @example 设置 logo 为网络地址  logo="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
   * @example 设置 logo 为组件  logo={<img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/>}
   * @example 设置 logo 为 false 不显示 logo  logo={false}
   * @example 设置 logo 为 方法  logo={()=> <img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/> }
   */
  logo?: VNode | JSX.Element | WithFalse<() => VNode | JSX.Element>
  /**
   * @name layout 的 loading 效果，设置完成之后只展示一个 loading
   *
   * @example loading={true}
   */
  loading?: boolean
  /**
   * @name 是否收起 layout 是严格受控的，可以 设置为 true，一直收起
   *
   * @example collapsed={true}
   */
  collapsed?: boolean
  /**
   * @name 页脚的配置
   *
   * @example 不展示dom footerRender={false}
   * @example 使用 layout 的  DefaultFooter   footerRender={() => (<DefaultFooter copyright="这是一条测试文案"/>}
   */
  footerRender?: WithFalse<(props: ProLayoutProps, defaultDom: VNode) => VNode>
  /**
   * @name 页脚的配置
   *
   * @example 不展示dom footerRender={false}
   * @example 使用 layout 的  DefaultFooter   footerRender={() => (<DefaultFooter copyright="这是一条测试文案"/>}
   */
  headerRender?: WithFalse<(props: ProLayoutProps, defaultDom: VNode) => VNode>
  /**
   * @name 设置 PageHeader 的面包屑，只能处理数据
   *
   * @example 手动设置 breadcrumbRender={(routers = []) => [ { path: '/', breadcrumbName: '主页'} ]
   * @example 增加一项 breadcrumbRender={(routers = []) => { return [{ path: '/', breadcrumbName: '主页'} ,...routers ]}
   * @example 删除首页 breadcrumbRender={(routers = []) => { return routers.filter(item => item.path !== '/')}
   * @example 不显示面包屑 breadcrumbRender={false}
   */
  breadcrumbRender?: WithFalse<
    (routers: BreadcrumbProps['routes']) => BreadcrumbProps['routes']
  >

  /**
   * @name 处理每个面包屑的配置，需要直接返回 dom
   * @description (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode
   *
   * @example 设置 disabled： itemRender={(route, params, routes, paths) => { return <Button disabled>{route.breadcrumbName}</Button> }}
   * @example 拼接 path： itemRender={(route, params, routes, paths) => { return <a href={paths.join('/')}>{route.breadcrumbName}</a> }}
   */
  itemRender?: BreadcrumbProps['itemRender']

  showPageTags?: boolean

  className?: string

  /**
   * @name  侧边菜单的类型, menu.type 的快捷方式
   * @type "sub" | "group"
   * @example group
   */
  siderMenuType?: 'sub' | 'group'
}

export interface ProlayoutEmits {
  (e: 'page-change', location?: { pathname?: string }): void
  (e: 'collapse', collapse: boolean): void
}
