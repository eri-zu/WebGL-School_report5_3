import fs from "fs";
import { send } from "vite";
import ejs from "ejs";
import { resolve } from "path";
const transformEjsToHtml = (server, path) => {
  try {
    console.log(path);
    const data = fs.readFileSync(path, "utf-8");
    const html = ejs.compile(data, {
      root: resolve(__dirname, "src/pages", "index.ejs"),
    })();
    return server.transformIndexHtml(path, html);
  } catch (error) {
    return server.transformIndexHtml(path, "Ejs error" + error);
  }
};

export const vitePluginEjsServe = () => {
  return {
    name: "vite-plugin-ejs-serve",
    enforce: "pre",
    // 開発サーバー時のみ
    apply: "serve",
    handleHotUpdate(context) {
      context.server.ws.send({
        type: "full-reload",
      });
      return [];
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const root = server.config.root;
        let fullReqPath = root + req.url;
        if (fullReqPath.endsWith("/")) {
          fullReqPath += "index.html";
        }
        if (fullReqPath.endsWith(".html")) {
          if (fs.existsSync(fullReqPath)) {
            return next();
          }

          const ejsPath = `${
            fullReqPath.slice(0, Math.max(0, fullReqPath.lastIndexOf("."))) ||
            fullReqPath
          }.ejs`;
          if (!fs.existsSync(ejsPath)) {
            return send(req, res, "404 Not Found", "html", {});
          }

          const html = await transformEjsToHtml(server, ejsPath);
          return send(req, res, html, "html", {});
        } else {
          return next();
        }
      });
    },
  };
};
