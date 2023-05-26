import { compilerTemplate, onMounted, onUnmounted } from "strve-sfc";
import { linkTo } from "strve-router";
import about from "./about.strve";

function About() {
  function goUser() {
    linkTo("/user");
  }

  onMounted(() => {
    console.log(">>> About MOUNTED <<<");
  });

  onUnmounted(() => {
    console.log(">>> About UNMOUNTED <<<");
  });

  function render() {
    return compilerTemplate(about, { goUser }, "about")();
  }

  return {
    render,
  };
}

export default About;
