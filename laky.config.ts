import { defineConfig } from 'laky';

export default defineConfig({
  generateApi: {
    name: 'api.ts',
    // eslint-disable-next-line node/prefer-global/process
    url: `${process.env.VITE_API_BASE}/docs-json`,
    httpClientType: 'axios',
  },
});
