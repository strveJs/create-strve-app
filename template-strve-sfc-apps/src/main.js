import { createApp, compilerTemplate } from "strve-sfc";
import App from "./App.strve";
import router from "./router/index";

createApp(compilerTemplate(App, { router }, "app")).mount("#app");
