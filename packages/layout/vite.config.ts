import { fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'CoverComponentsVue',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
    },
  },
});
