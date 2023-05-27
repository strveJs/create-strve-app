import { compilerTemplate, setData, onMounted, onUnmounted } from "strve-sfc";
import home from "./home.strve";
import Tab from "../../components/tab/tab";

function Home() {
  const data = {
    count: 0,
  };

  function useAdd() {
    setData(() => {
      data.count++;
    });
  }

  onMounted(() => {
    console.log(">>> Home Mounted <<<");
  });

  onUnmounted(() => {
    console.log(">>> Home Unmounted <<<");
  });

  function render() {
    return compilerTemplate(home, { ...data, useAdd, Tab }, "home")();
  }

  return {
    render,
  };
}

export default Home;
