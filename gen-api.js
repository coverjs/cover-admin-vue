import path from "node:path";
import { generateApi } from "swagger-typescript-api";

const bootstrap = () => {
  generateApi({
    name: "index.ts",
    output: path.resolve(process.cwd(), "./src/services"),
    url: "http://154.221.27.105:1118/docs-json",
    httpClientType: "axios",
  });
};

bootstrap();