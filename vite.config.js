import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { findAllFiles } from "./plugins/CustomBuildFunctions";
import sassGlobImports from "vite-plugin-sass-glob-import";
import glsl from "vite-plugin-glsl";

const root = "./src/pages";

export default defineConfig(async () => {
  const rollupOptionsInput = await findAllFiles(root, ".html");
  return {
    root,
    base: "./",
    publicDir: "../../public",
    css: {
      devSourcemap: true,
    },
    build: {
      outDir: "../../dist",
      emptyOutDir: true,

      rollupOptions: {
        input: rollupOptionsInput,
        output: {
          entryFileNames: `assets/js/main.js`,
          chunkFileNames: `assets/js/modules/[name].js`,
          assetFileNames: (assetInfo) => {
            if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(assetInfo.name)) {
              return "assets/img/[name].[ext]";
            }
            if (/\.css$/.test(assetInfo.name)) {
              return "assets/css/style.[ext]";
            }
            return "assets/[name].[ext]";
          },
        },
      },
    },

    plugins: [
      ViteEjsPlugin((config) => {
        return {
          root: resolve(__dirname, "src"),
          compPath: "../components",
        };
      }),
      sassGlobImports(),
      glsl(),
    ],
    server: {
      port: 3000,
      host: true,
    },
  };
});
