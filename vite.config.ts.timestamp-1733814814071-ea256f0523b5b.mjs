// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/vite@5.4.10_@types+node@22.9.0_sass@1.80.6_terser@5.36.0/node_modules/vite/dist/node/index.js";
import { resolve } from "node:path";
import vue from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/@vitejs+plugin-vue@5.1.5_vite@5.4.10_@types+node@22.9.0_sass@1.80.6_terser@5.36.0__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1.0_vite@5.4.10_@types+node@22.9.0_sass@1.80.6_terser@5.36.0__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import UnoCSS from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/unocss@0.64.1_postcss@8.4.48_rollup@2.79.2_vite@5.4.10_@types+node@22.9.0_sass@1.80.6_terser@_kkmm5p75nmwg2qvzdvarog6kli/node_modules/unocss/dist/vite.mjs";
import layouts from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/vite-plugin-vue-layouts@0.11.0_vite@5.4.10_@types+node@22.9.0_sass@1.80.6_terser@5.36.0__vue-_6j3gkzekbhftw5guc2363syxsu/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import autoImport from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/unplugin-auto-import@0.18.3_@vueuse+core@10.11.1_vue@3.5.12_typescript@5.6.3___rollup@2.79.2/node_modules/unplugin-auto-import/dist/vite.js";
import components from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_rollup@2.79.2_vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/vite.js";
import vueRouter from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/unplugin-vue-router@0.10.8_rollup@2.79.2_vue-router@4.4.5_vue@3.5.12_typescript@5.6.3___vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-router/dist/vite.js";
import { AntDesignVueResolver } from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_rollup@2.79.2_vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
import { VueRouterAutoImports } from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/unplugin-vue-router@0.10.8_rollup@2.79.2_vue-router@4.4.5_vue@3.5.12_typescript@5.6.3___vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-router/dist/index.js";
import { createHtmlPlugin as html } from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.4.10_@types+node@22.9.0_sass@1.80.6_terser@5.36.0_/node_modules/vite-plugin-html/dist/index.mjs";
import { VitePWA } from "file:///D:/Codes/cover-admin-vue/node_modules/.pnpm/vite-plugin-pwa@0.20.5_vite@5.4.10_@types+node@22.9.0_sass@1.80.6_terser@5.36.0__workbox-buil_rl4o7vlroeg5ototsfpjlpfhky/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "D:\\Codes\\cover-admin-vue";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      vueRouter({
        exclude: ["**/components/*.vue"],
        importMode: "async"
      }),
      html({
        minify: true
      }),
      layouts({
        layoutsDirs: "src/layouts",
        pagesDirs: "src/pages",
        defaultLayout: "default"
      }),
      components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
          })
        ]
      }),
      autoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/,
          // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/,
          // .vue
          /\.md$/
          // .md
        ],
        imports: [
          // presets
          "vue",
          "pinia",
          "@vueuse/core",
          "vue-i18n",
          VueRouterAutoImports
        ]
      }),
      VitePWA(),
      UnoCSS()
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src"),
        "@config": resolve(__vite_injected_original_dirname, "./config")
      }
    },
    server: {
      port: Number.parseInt(env.VITE_SERVER_PORT),
      proxy: {
        [env.VITE_GLOB_API_URL]: {
          target: env.VITE_API_BASE,
          changeOrigin: true,
          ws: false,
          // // 将前缀api替换为空字符串
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_GLOB_API_URL}`), "")
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: [
              "vue",
              "vue-router",
              "vue-i18n",
              "pinia",
              "pinia-plugin-persistedstate",
              "@vueuse/core"
            ],
            onion: ["onion-interceptor", "@onion-interceptor/pipes"],
            axios: ["axios"],
            antd: ["ant-design-vue"],
            antdIcon: ["@ant-design/icons-vue"],
            other: ["nprogress", "object-hash", "dayjs"]
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2Rlc1xcXFxjb3Zlci1hZG1pbi12dWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXENvZGVzXFxcXGNvdmVyLWFkbWluLXZ1ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kZXMvY292ZXItYWRtaW4tdnVlL3ZpdGUuY29uZmlnLnRzXCI7LyogZXNsaW50LWRpc2FibGUgcGVyZmVjdGlvbmlzdC9zb3J0LWltcG9ydHMgKi9cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCc7XG5cbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJztcbmltcG9ydCBsYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJztcbmltcG9ydCBhdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgdnVlUm91dGVyIGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvdml0ZSc7XG5cbmltcG9ydCB7IEFudERlc2lnblZ1ZVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCB7IFZ1ZVJvdXRlckF1dG9JbXBvcnRzIH0gZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlcic7XG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIGFzIGh0bWwgfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJztcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9wcmVmZXItZ2xvYmFsL3Byb2Nlc3NcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcbiAgcmV0dXJuIHtcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGFwaTogJ21vZGVybi1jb21waWxlcicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICB2dWVKc3goKSxcbiAgICAgIHZ1ZVJvdXRlcih7XG4gICAgICAgIGV4Y2x1ZGU6IFsnKiovY29tcG9uZW50cy8qLnZ1ZSddLFxuICAgICAgICBpbXBvcnRNb2RlOiAnYXN5bmMnLFxuICAgICAgfSksXG4gICAgICBodG1sKHtcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxuICAgICAgfSksXG4gICAgICBsYXlvdXRzKHtcbiAgICAgICAgbGF5b3V0c0RpcnM6ICdzcmMvbGF5b3V0cycsXG4gICAgICAgIHBhZ2VzRGlyczogJ3NyYy9wYWdlcycsXG4gICAgICAgIGRlZmF1bHRMYXlvdXQ6ICdkZWZhdWx0JyxcbiAgICAgIH0pLFxuICAgICAgY29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKHtcbiAgICAgICAgICAgIGltcG9ydFN0eWxlOiBmYWxzZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgICAgYXV0b0ltcG9ydCh7XG4gICAgICAgIC8vIHRhcmdldHMgdG8gdHJhbnNmb3JtXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAvXFwuW3RqXXN4PyQvLCAvLyAudHMsIC50c3gsIC5qcywgLmpzeFxuICAgICAgICAgIC9cXC52dWUkLyxcbiAgICAgICAgICAvXFwudnVlXFw/dnVlLywgLy8gLnZ1ZVxuICAgICAgICAgIC9cXC5tZCQvLCAvLyAubWRcbiAgICAgICAgXSxcbiAgICAgICAgaW1wb3J0czogW1xuICAgICAgICAgIC8vIHByZXNldHNcbiAgICAgICAgICAndnVlJyxcbiAgICAgICAgICAncGluaWEnLFxuICAgICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICAgICd2dWUtaTE4bicsXG4gICAgICAgICAgVnVlUm91dGVyQXV0b0ltcG9ydHMsXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAgIFZpdGVQV0EoKSxcbiAgICAgIFVub0NTUygpLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAgICdAY29uZmlnJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL2NvbmZpZycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogTnVtYmVyLnBhcnNlSW50KGVudi5WSVRFX1NFUlZFUl9QT1JUKSxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFtlbnYuVklURV9HTE9CX0FQSV9VUkxdOiB7XG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9BUElfQkFTRSxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgd3M6IGZhbHNlLFxuICAgICAgICAgIC8vIC8vIFx1NUMwNlx1NTI0RFx1N0YwMGFwaVx1NjZGRlx1NjM2Mlx1NEUzQVx1N0E3QVx1NUI1N1x1N0IyNlx1NEUzMlxuICAgICAgICAgIHJld3JpdGU6IHBhdGggPT5cbiAgICAgICAgICAgIHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtlbnYuVklURV9HTE9CX0FQSV9VUkx9YCksICcnKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA2MDAsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgdnVlOiBbXG4gICAgICAgICAgICAgICd2dWUnLFxuICAgICAgICAgICAgICAndnVlLXJvdXRlcicsXG4gICAgICAgICAgICAgICd2dWUtaTE4bicsXG4gICAgICAgICAgICAgICdwaW5pYScsXG4gICAgICAgICAgICAgICdwaW5pYS1wbHVnaW4tcGVyc2lzdGVkc3RhdGUnLFxuICAgICAgICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBvbmlvbjogWydvbmlvbi1pbnRlcmNlcHRvcicsICdAb25pb24taW50ZXJjZXB0b3IvcGlwZXMnXSxcbiAgICAgICAgICAgIGF4aW9zOiBbJ2F4aW9zJ10sXG4gICAgICAgICAgICBhbnRkOiBbJ2FudC1kZXNpZ24tdnVlJ10sXG4gICAgICAgICAgICBhbnRkSWNvbjogWydAYW50LWRlc2lnbi9pY29ucy12dWUnXSxcbiAgICAgICAgICAgIG90aGVyOiBbJ25wcm9ncmVzcycsICdvYmplY3QtaGFzaCcsICdkYXlqcyddLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGNBQWMsZUFBZTtBQUN0QyxTQUFTLGVBQWU7QUFFeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFP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
