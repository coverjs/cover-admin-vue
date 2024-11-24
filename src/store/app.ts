import type { MenuData, MenuDataItem } from '@/router/types.ts'

import type { LayoutSetting, PageTagItem, ThemeType } from '@/types'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { CacheEnum, PageEnum } from '@/enums'
import { generateMenuAndRoutes } from '@/router/dynamicRoutes.ts'
import staticRoutes from '@/router/staticRoutes.ts'
import { api } from '@/services'
import { genStorageKey } from '@/utils'
import { defaultLayoutSetting } from '@config'
import { theme as antdTheme } from 'ant-design-vue/es'

const isDark = useDark()
const toggleDark = useToggle(isDark)

export const useAppStore = defineStore('app', () => {
  /**
   * ----------------------------- theme&layout start-----------------------------
   * --------------------------主题以及布局相关----------------------------------
   */
  const { darkAlgorithm, defaultAlgorithm } = antdTheme

  const layoutSetting = reactive<LayoutSetting>(defaultLayoutSetting)
  const themeConfig: ThemeConfig = reactive<ThemeConfig>({
    algorithm:
      layoutSetting.theme === 'light' ? [defaultAlgorithm] : [darkAlgorithm],
    token: {
      colorPrimary: layoutSetting.colorPrimary,
      colorBgContainer:
        layoutSetting.theme === 'light' ? '#fff' : 'rgb(36, 37, 37)',
    },
  })

  if (isDark.value || layoutSetting.theme === 'dark')
    toggleTheme('dark')

  watch(isDark, () => {
    if (isDark.value)
      toggleTheme('dark')
    else toggleTheme('light')
  })

  /**
   * 切换主题配置
   * @param theme 当前选择的主题类型，可以是 'light' 或 'dark'
   */
  function toggleTheme(theme: ThemeType) {
    layoutSetting.theme = theme
    if (theme === 'light') {
      toggleDark(false)
      themeConfig.algorithm = [defaultAlgorithm]
      if (themeConfig.token)
        themeConfig.token.colorBgContainer = '#fff'
    }
    else if (theme === 'dark') {
      toggleDark(true)
      themeConfig.algorithm = [darkAlgorithm]
      if (themeConfig.token)
        themeConfig.token.colorBgContainer = 'rgb(36, 37, 37)'
    }
  }

  /**
   * 切换主颜色设置
   * 此函数用于更新布局设置中的主颜色，并同步更新主题配置中的主颜色
   * @param color 新的主颜色值
   */
  function toggleColorPrimary(color: string) {
    layoutSetting.colorPrimary = color
    if (themeConfig.token) {
      themeConfig.token.colorPrimary = color
    }
  }

  /**
   * 更改设置布局
   * 此函数根据传入的key和value参数，更新特定的布局设置
   * 它通过switch语句来决定调用哪个相应的函数以更改设置
   *
   * @param key - 要更改的设置键，必须是LayoutSetting类型的一个键
   * @param value - 要设置的新值
   */
  function changeSettingLayout(key: keyof LayoutSetting, value: any) {
    switch (key) {
      case 'colorPrimary':
        toggleColorPrimary(value)
        return
      case 'theme':
        toggleTheme(value)
    }
  }

  /**
   * ----------------------------- theme&layout end-----------------------------
   */

  /**
   * ----------------------------- menu&router start-----------------------------
   * --------------------------菜单以及动态路由相关-----------------------------
   */

  const routerData = shallowRef()
  const menuData = shallowRef<MenuData>([])

  /**
   * 异步获取菜单数据并生成对应的路由和菜单
   *
   * 本函数通过调用API获取当前用户的菜单信息，然后根据这些信息生成应用中的菜单和路由
   * 使用async/await语法糖来处理异步操作，使得代码更加简洁易读
   *
   * @returns {Promise<any>} 返回生成的菜单和路由数据
   */
  async function getMenuData() {
    const { data: res } = await api.profile.profileGetMenus()
    return generateMenuAndRoutes(res.data)
  }

  /**
   * 异步生成动态路由
   *
   * 此函数的作用是获取菜单数据和路由数据，并将它们应用到应用中的菜单和路由配置中
   * 它首先调用getMenuData函数来获取经过处理的菜单数据和路由数据，然后将这些数据更新到应用的相应状态中
   * 这有助于在应用启动时或按需时动态地生成和更新应用的路由配置
   *
   * @returns {Promise<object>} 返回更新后的路由数据对象，包括根路由和子路由
   */
  async function generateDynamicRoutes() {
    const { menuData: treeMenuData, routeData: treeRouterData }
      = await getMenuData()
    const root = staticRoutes.find(item => item.path === '/')
    root?.children?.push(...treeRouterData)
    const home = staticRoutes.find(item => item.path === PageEnum.BASE_HOME)
    const homePage = {
      ...home?.children![0],
      path: '/home',
      name: '首页',
      locale: 'menu.home.home',
      icon: 'FileOutlined',
    } as MenuDataItem
    menuData.value = [homePage, ...treeMenuData]
    routerData.value = treeRouterData
    return root!
  }

  /**
   * ----------------------------- menu&router end-----------------------------
   */

  /**
   * ----------------------------- tags start---------------------------------
   * --------------------------标签页相关------------------------------------
   */

  const tags: Ref<Array<PageTagItem>> = useLocalStorage(
    genStorageKey(CacheEnum.PAGE_TAGS_KEY),
    [] as PageTagItem[],
  )

  function addTag(tag: PageTagItem) {
    const isExist = tags.value.some(item => item.path === tag.path)
    if (!isExist) {
      tags.value.push(tag)
    }
  }

  function removeTag(tag: PageTagItem) {
    tags.value = tags.value.filter(item => item.path !== tag.path)
  }

  function removeTags(target: PageTagItem[]) {
    tags.value = tags.value.filter(item => !target.includes(item))
  }

  return {
    layoutSetting,
    theme: themeConfig,
    changeSettingLayout,
    generateDynamicRoutes,
    menuData,
    routerData,
    tags,
    addTag,
    removeTag,
    removeTags,
  }
})
