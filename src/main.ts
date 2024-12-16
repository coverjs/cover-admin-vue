import type { App as VueApp } from 'vue';
import { createApp } from 'vue';
import App from './App.vue';
import { setupAccessDirective } from './directives';
import { setupLocale } from './locales';
import { setupRouter } from './router';
import { setupStore } from './store';
import { loadEnv } from './utils';
import 'ant-design-vue/dist/reset.css';
import './styles/index.scss';
import 'virtual:uno.css';

function bootstrap() {
  const envVals = loadEnv();
  const env = envVals.PROD ? 'prod' : 'dev';
  const namespace = `${envVals.VITE_APP_NAMESPACE}-${env}`;

  const app = createApp(App);

  setupLocale(app);

  setupStore(app, { namespace });

  setupRouter(app);

  setupDirective(app);

  app.mount('#app');
}

function setupDirective(app: VueApp) {
  setupAccessDirective(app);
}

bootstrap();
