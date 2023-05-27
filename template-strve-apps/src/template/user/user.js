import { compilerTemplate, onMounted, onUnmounted } from "strve-sfc";
import user from "./user.strve";
import Tab from "../../components/tab/tab";

function User() {
  onMounted(() => {
    console.log(">>> User Mounted <<<");
  });
  onUnmounted(() => {
    console.log(">>> User Unmounted <<<");
  });

  function render() {
    return compilerTemplate(user, { Tab }, "user")();
  }

  return {
    render,
  };
}

export default User;
