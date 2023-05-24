import { compilerTemplate, createApp, setData } from "strve-sfc";
import "@/styles/index.css";
import App from "./App.strve";

const data = {
  msg: "Hello Strve SFC",
  count: 0,
  useAdd,
};

function useAdd() {
  setData(() => {
    data.count++;
  });
}

createApp(compilerTemplate(App, data, "app")).mount("#app");
