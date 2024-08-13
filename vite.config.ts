import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { VueRouterAutoImports } from "unplugin-vue-router";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import components from "unplugin-vue-components/vite";
import layouts from "vite-plugin-vue-layouts";
import vueRouter from "unplugin-vue-router/vite";
import autoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueRouter({
      exclude: ["**/components/*.vue"],
    }),
    layouts({
      layoutsDirs: "src/layouts",
      pagesDirs: "src/pages",
      defaultLayout: "default",
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
        "vue",
        "pinia",
        "@vueuse/core",
        "vue-i18n",
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
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://154.221.27.105:1118",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
