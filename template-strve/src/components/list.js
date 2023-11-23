import { setData, registerComponent } from 'strve-js';
import style from '../style/list.module.css';

export const listCom = registerComponent();
const listState = {
  arr: [1, 2],
};

let count = 3;
function usePush() {
  setData(() => {
    listState.arr.push(count++);
  }, [listCom, List]);
}

function useUnshift() {
  setData(() => {
    listState.arr.unshift(count++);
  }, [listCom, List]);
}

function useDel() {
  setData(() => {
    listState.arr.splice(1, 1);
  }, [listCom, List]);
}

export const List = () =>
  html`
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
