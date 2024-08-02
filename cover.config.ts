import { defineConfig } from "cover-cli";

export default defineConfig({
  generateApi: {
    name: "index.ts",
    url: "http://154.221.27.105:1118/docs-json",
    httpClientType: "axios",
  },
});
