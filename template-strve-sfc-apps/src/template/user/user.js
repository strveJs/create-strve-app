import { compilerTemplate, setData, onMounted, onUnmounted } from "strve-sfc";
import { linkTo } from "strve-router";
import user from "./user.strve";

function User() {
  const data = {
    msg: "admin",
  };

  function useChange() {
    setData(() => {
      data.msg = "editor";
    });
  }

  function goHome() {
    linkTo("/");
  }

  onMounted(() => {
    console.log(">>> User MOUNTED <<<");
  });
  onUnmounted(() => {
    console.log(">>> User UNMOUNTED <<<");
  });

  function render() {
    return compilerTemplate(user, { ...data, useChange, goHome }, "user")();
  }

  return {
    render,
  };
}

export default User;
