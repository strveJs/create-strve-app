import { setData, onMounted, h, compilerTemplate, domInfo } from "strve-sfc";
import c2 from "./view.strve";
const data = {
  msg: "Hello",
  btn: change,
  time: "",
};

function setTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return `${year}年${month}月${date}日 ${hour}:${minute}:${
    second < 10 ? "0" + second : second
  }`;
}

onMounted(() => {
  setInterval(() => {
    setData(() => {
      data.time = setTime();
    });
  }, 1000);
});

function change() {
  setData(() => {
    console.log(domInfo.msg);
    data.msg = "World";
  });
}

export { c2, data };
