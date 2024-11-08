import 'ant-design-vue/dist/reset.css';
import './styles/index.scss';
import { createApp } from 'vue';
import { setupStore } from './store';
import { setupLocale } from './locales';
import { setupRouter } from './router';
import App from './App.vue';

function bootstrap() {
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${env}`;

  const app = createApp(App);

  setupLocale(app);

  setupStore(app, { namespace });

  setupRouter(app);

  app.mount('#app');
}

bootstrap();
