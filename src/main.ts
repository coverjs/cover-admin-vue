import { createApp } from 'vue';
import { setupStore } from './store';
import { setupLocale } from './locales';
import { setupRouter } from './router';
import { loadEnv } from './utils';

import App from './App.vue';

import 'ant-design-vue/dist/reset.css';
import './styles/index.scss';

function bootstrap() {
  const envVals = loadEnv();
  const env = envVals.PROD ? 'prod' : 'dev';
  const namespace = `${envVals.VITE_APP_NAMESPACE}-${env}`;

  const app = createApp(App);

  setupLocale(app);

  setupStore(app, { namespace });

  setupRouter(app);

  app.mount('#app');
}

bootstrap();
