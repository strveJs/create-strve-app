import { compilerTemplate, onMounted, onUnmounted } from "strve-sfc";
import about from "./about.strve";
import Tab from "../../components/tab/tab";

function About() {
  onMounted(() => {
    console.log(">>> About Mounted <<<");
  });

  onUnmounted(() => {
    console.log(">>> About Unmounted <<<");
  });

  function render() {
    return compilerTemplate(about, { Tab }, "about")();
  }

  return {
    render,
  };
}

export default About;
