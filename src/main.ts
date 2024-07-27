import "ant-design-vue/dist/reset.css";
import { createApp } from "vue";
import { setupStore } from "./store";
import { setupRouter } from "./router";
import App from "./App.vue";

function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  setupRouter(app);

  app.mount("#app");
}

bootstrap();
