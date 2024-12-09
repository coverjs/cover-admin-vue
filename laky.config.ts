import { defineConfig } from 'laky';

export default defineConfig({
  generateApi: {
    name: 'api.ts',
    // eslint-disable-next-line node/prefer-global/process
    url: `${process.env.VITE_API_BASE}/docs-json`,
    // url: 'http://localhost:1118/docs-json',
    httpClientType: 'axios',
    unwrapResponseData: true,
    hooks: {
      // onCreateRoute: route => {
      //   set(route, ['response', 'type'], get(route, ['response', 'errorType']));
      //   return route;
      // }
    }
  },
});
