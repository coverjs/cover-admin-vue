import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createHtmlPlugin as html } from 'vite-plugin-html';
import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import components from 'unplugin-vue-components/vite';
import layouts from 'vite-plugin-vue-layouts';
import vueRouter from 'unplugin-vue-router/vite';
import autoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueRouter({
        exclude: ['**/components/*.vue'],
      }),
      html({
        minify: true,
      }),
      layouts({
        layoutsDirs: 'src/layouts',
        pagesDirs: 'src/pages',
        defaultLayout: 'default',
      }),
      components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
      autoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          // presets
          'vue',
          'pinia',
          '@vueuse/core',
          'vue-i18n',
          VueRouterAutoImports,
        ],
        eslintrc: {
          enabled: true,
        },
      }),
      VitePWA(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: parseInt(env.VITE_SERVER_PORT),
      proxy: {
        [env.VITE_GLOB_API_URL]: {
          target: env.VITE_API_BASE,
          changeOrigin: true,
          ws: false,
          // // 将前缀api替换为空字符串
          rewrite: path =>
            path.replace(new RegExp(`^${env.VITE_GLOB_API_URL}`), ''),
        },
      },
    },
  };
});
