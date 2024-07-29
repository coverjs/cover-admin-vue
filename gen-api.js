import path from "node:path";
import { generateApi } from "swagger-typescript-api";

generateApi({
  name: "index.ts",
  output: path.resolve(process.cwd(), "./src/services"),
  templates: path.resolve(process.cwd(), "./api-templates"),
  url: "http://154.221.27.105:1118/docs-json",
  httpClientType: "axios",
});
