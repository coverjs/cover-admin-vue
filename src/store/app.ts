import type { LayoutSetting, ThemeType } from '@/types';

import { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import { theme as antdTheme } from 'ant-design-vue/es';
import { defaultLayoutSetting } from '@config';
import { api } from '@/services';
import { generateMenuAndRoutes } from '@/router/dynamicRoutes.ts';
import { rootRoute } from '@/router/staticRoutes.ts';
import { MenuData } from '@/router/types.ts';

const isDark = useDark();
const toggleDark = useToggle(isDark);

export const useAppStore = defineStore('app', () => {
  const { darkAlgorithm, defaultAlgorithm } = antdTheme;
  const layoutSetting = reactive<LayoutSetting>(defaultLayoutSetting);
  const themeConfig: ThemeConfig = reactive<ThemeConfig>({
    algorithm: layoutSetting.theme === 'light' ? [defaultAlgorithm] : [darkAlgorithm],
    token: {
      colorPrimary: layoutSetting.colorPrimary,
      colorBgContainer: layoutSetting.theme === 'light' ? '#fff' : 'rgb(36, 37, 37)',
    },
  });

  const routerData = shallowRef();
  const menuData = shallowRef<MenuData>([]);


  isDark.value = false;
  if (isDark.value || layoutSetting.theme === 'dark')
    toggleTheme('dark');

  // 监听isDark的变化
  watch(isDark, () => {
    if (isDark.value) toggleTheme('dark');
    else toggleTheme('light');
  });

  function toggleTheme(theme: ThemeType) {
    // if (layoutSetting.theme === theme) return;
    layoutSetting.theme = theme;
    if (theme === 'light') {
      toggleDark(false);
      themeConfig.algorithm = [defaultAlgorithm];
      if (themeConfig.token) themeConfig.token.colorBgContainer = '#fff';
    } else if (theme === 'dark') {
      toggleDark(true);
      themeConfig.algorithm = [darkAlgorithm];
      if (themeConfig.token)
        themeConfig.token.colorBgContainer = 'rgb(36, 37, 37)';
    }
  }

  function toggleColorPrimary(color: string) {
    layoutSetting.colorPrimary = color;
    if (themeConfig.token) {
      themeConfig.token.colorPrimary = color;
    }
  }

  function changeSettingLayout(key: keyof LayoutSetting, value: any) {
    switch (key) {
      case 'colorPrimary':
        toggleColorPrimary(value);
        return;
      case 'theme':
        toggleTheme(value);
        return;
    }
  }


  async function getMenuData() {
    const { data: res } = await api.profile.profileGetMenus();
    return generateMenuAndRoutes(res.data);
  }

  const generateDynamicRoutes = async () => {
    const { menuData: treeMenuData, routeData: treeRouterData } = await getMenuData();
    menuData.value = treeMenuData;
    routerData.value = {
      ...rootRoute,
      children: treeRouterData,
    };
    return routerData.value;
  };

  return {
    layoutSetting,
    theme: themeConfig,
    menuData,
    routerData,
    changeSettingLayout,
    generateDynamicRoutes,
  };
});
