import { compilerTemplate, setData } from "strve-sfc";
import { linkTo } from "strve-router";
import tab from "./tab.strve";

let isActivePath = location.hash.split("#")[1];

addEventListener("hashchange", (e) => {
  setData(() => {
    isActivePath = e.newURL.split("#")[1];
  });
});

function Tab() {
  function goAbout() {
    linkTo("/about");
  }
  function goUser() {
    linkTo("/user");
  }
  function goHome() {
    linkTo("/");
  }

  return compilerTemplate(
    tab,
    { isActivePath, goAbout, goHome, goUser },
    "tab"
  )();
}

export default Tab;
