/* eslint-disable perfectionist/sort-imports */
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import { createHtmlPlugin as html } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';

import tailwindcss from 'tailwindcss';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import layouts from 'vite-plugin-vue-layouts';
import vueRouter from 'unplugin-vue-router/vite';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd());
  return {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
      postcss: {
        plugins: [tailwindcss],
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      vueRouter({
        exclude: ['**/components/*.vue'],
        importMode: 'async',
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
      }),
      VitePWA(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@config': resolve(__dirname, './config'),
      },
    },
    server: {
      port: Number.parseInt(env.VITE_SERVER_PORT),
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
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: [
              'vue',
              'vue-router',
              'vue-i18n',
              'pinia',
              'pinia-plugin-persistedstate',
              '@vueuse/core',
            ],
            onion: ['onion-interceptor', '@onion-interceptor/pipes'],
            axios: ['axios'],
            antd: ['ant-design-vue'],
            antdIcon: ['@ant-design/icons-vue'],
            other: ['nprogress', 'object-hash', 'dayjs'],
          },
        },
      },
    },
  };
});
