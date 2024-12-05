import { defineConfig } from 'laky';
import { get, set } from 'lodash-es';

export default defineConfig({
  generateApi: {
    name: 'api.ts',
    // eslint-disable-next-line node/prefer-global/process
    url: `${process.env.VITE_API_BASE}/docs-json`,
    httpClientType: 'axios',
    hooks: {
      onCreateRoute: route => {
        set(route, ['response', 'type'], get(route, ['response', 'errorType']));
        return route;
      }
    }
  },
});
