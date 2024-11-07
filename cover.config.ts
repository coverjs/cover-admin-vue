import { defineConfig } from 'cover-cli';

export default defineConfig({
  generateApi: {
    name: 'index.ts',
    url: `${process.env.VITE_API_BASE}/docs-json`,
    httpClientType: 'axios',
  },
});
