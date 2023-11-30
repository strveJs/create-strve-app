import { setData, registerComponent } from 'strve-js';
import style from '../style/list.module.css';

export default function List() {
  let [listCom, render] = [registerComponent()];
  const listState = {
    arr: [1, 2],
  };
  let count = 3;

  function usePush() {
    setData(() => {
      listState.arr.push(count++);
    }, [listCom, render]);
  }

  function useUnshift() {
    setData(() => {
      listState.arr.unshift(count++);
    }, [listCom, render]);
  }

  function useDel() {
    setData(() => {
      listState.arr.splice(1, 1);
    }, [listCom, render]);
  }

  return (render = () =>
    html`
      <fragment $id=${listCom}>
        <div class=${style.listInner}>
          <button onClick=${useUnshift}>Unshift</button>
          <button onClick=${usePush}>Push</button>
          <button onClick=${useDel}>Del</button>
        </div>
        <ul class=${style.listInner}>
          ${listState.arr.map((item) => html`<li key=${item}>${item}</li>`)}
        </ul>
      </fragment>
    `);
}
