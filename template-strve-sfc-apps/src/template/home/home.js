import { compilerTemplate, setData, onMounted, onUnmounted } from "strve-sfc";
import { linkTo } from "strve-router";
import home from "./home.strve";

function Home() {
  const data = {
    count: 0,
  };

  function useAdd() {
    setData(() => {
      data.count++;
    });
  }

  function goAbout() {
    linkTo("/about");
  }

  onMounted(() => {
    console.log(">>> HOME MOUNTED <<<");
  });

  onUnmounted(() => {
    console.log(">>> HOME UNMOUNTED <<<");
  });

  function render() {
    return compilerTemplate(home, { ...data, useAdd, goAbout }, "home")();
  }

  return {
    render,
  };
}

export default Home;
