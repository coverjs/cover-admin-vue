import 'ant-design-vue/dist/reset.css';
import './styles/index.scss';
import { createApp } from 'vue';
import { setupStore } from './store';
import { setupLocale } from './locales';
import { setupRouter, router } from './router';
import { setupRouterGuards } from './router/guard';
import App from './App.vue';

function bootstrap() {
  const app = createApp(App);

  setupLocale(app);

  setupStore(app);

  setupRouter(app);

  setupRouterGuards(router);

  app.mount('#app');
}

bootstrap();
