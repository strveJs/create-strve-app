import { setData } from "strve-js";
import style from "../style/list.module.css";

const listState = {
  arr: [1, 2],
};

export default function List() {
  return html`
    <fragment>
      <div class=${style.listInner}>
        <button onClick=${useUnshift}>Unshift</button>
        <button onClick=${usePush}>Push</button>
        <button onClick=${useDel}>Del</button>
      </div>
      <ul class=${style.listInner}>
        ${listState.arr.map((item) => html`<li key=${item}>${item}</li>`)}
      </ul>
    </fragment>
  `;
}

let count = 3;
function usePush() {
  setData(
    () => {
      listState.arr.push(count++);
    },
    {
      name: List,
    }
  );
}

function useUnshift() {
  setData(
    () => {
      listState.arr.unshift(count++);
    },
    {
      name: List,
    }
  );
}

function useDel() {
  setData(
    () => {
      listState.arr.splice(1, 1);
    },
    {
      name: List,
    }
  );
}
