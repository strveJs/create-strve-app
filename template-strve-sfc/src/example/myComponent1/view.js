import {
  h,
  compilerTemplate,
  setData,
  defineCustomElement,
  domInfo,
} from "strve-sfc";
import c1 from "./view.strve";
import { c2, data } from "../myComponent2/view.js";

const obj1 = {
  b: 1,
  f: function () {
    setData(() => {
      obj1.b++;
    });
  },
  cc: function (params) {
    console.log(params.detail);
  },
  c2: compilerTemplate(c2, data, "myComponent2"),
};

const _data = {
  count: 1,
};

function changeCount() {
  setData(
    () => {
      _data.count++;
      const event = new CustomEvent("eventName", {
        detail: {
          message: "Hello World",
          time: new Date(),
        },
        bubbles: true,
        // cancelable: true,
      });
      domInfo["ccc"].dispatchEvent(event); //给节点分派一个合成事件
    },
    {
      customElement: myCom2,
      name: "useCustomElement",
    }
  );
}

const myCom2 = {
  id: "myCom2",
  template: () => {
    return h`
				<h2 $key="hh" @click="${changeCount}">count:${_data.count}</h2>
		`;
  },
};

defineCustomElement(myCom2, "my-com2");

export { c1, obj1 };
