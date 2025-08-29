import { defineConfig } from "$fresh/server.ts";
import { plugins } from "deco/plugins/deco.ts";
import manifest from "./manifest.gen.ts";
import { mcpServer } from "@deco/mcp";
// import tailwind from "./tailwind.config.ts";

export default defineConfig({
  plugins: plugins({
    manifest,
    useServer: (deco, hono) => {
      hono.use(
        "/*",
        mcpServer(deco, {
          include: [
            "vtex/loaders/categories/tree.ts",
          ],
        }),
      );
    },
  }),
});
