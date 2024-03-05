import fs from "fs";
import ejs from "ejs";
import { resolve } from "path";
export const viteCustomBuildEjsPlugin = () => {
  const pathMap = {};
  return {
    name: "vite-plugin-ejs-build-custom",
    enforce: "pre",
    apply: "build",
    resolveId(source) {
      if (source.endsWith(".ejs")) {
        const dummy = `${
          source.slice(0, Math.max(0, source.lastIndexOf("."))) || source
        }.html`;
        pathMap[dummy] = source;
        return dummy;
      }
    },
    load(id) {
      if (id.endsWith(".html")) {
        if (pathMap[id]) {
          const data = fs.readFileSync(pathMap[id], "utf-8");

          const html = ejs.compile(data, {
            root: resolve(__dirname, "src/pages", "index.ejs"),
          })();

          return html;
        }

        return fs.readFileSync(id, "utf-8");
      }
    },
  };
};
