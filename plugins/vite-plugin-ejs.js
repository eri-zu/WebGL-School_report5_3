import { viteCustomBuildEjsPlugin } from "./vite-plugin-ejs-build";
import { vitePluginEjsServe } from "./vite-plugin-ejs-serve";

const vitePluginEjs = () => {
  return [viteCustomBuildEjsPlugin(), vitePluginEjsServe()];
};

export default vitePluginEjs;
