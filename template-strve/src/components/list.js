import { render,updateView,emitEvent } from 'strvejs';
import style from  '../style/list.module.css';

const listState = {
    arr: [1, 2],
    txt:'this is txt.'
  };

export default function List(v) {
  return render/*html*/`
        <button onClick=${useUnshift}>Unshift</button>
        <button onClick=${usePush}>Push</button>
        <button onClick=${useDel}>Del</button>
        <button onClick=${useEmit}>Emit</button>
        <ul class="${style.listInner}">
            ${listState.arr.map((item) => render/*html*/`<li>${item}</li>`)}
        </ul>
        <p class="${style.int}">${v}</p>
        <p>${listState.txt}</p>
`;
}

let count = 3;
function usePush() {
    updateView(() => {
      listState.arr.push(count++);
    });
}
function useUnshift(){
  updateView(() => {
    listState.arr.unshift(count++);
  },'useFkey');
}
function useDel() {
    updateView(() => {
      listState.arr.splice(1, 1);
    });
}

function useEmit(){
  emitEvent('useGetTit',{
    detail:{
      tit:'This is title.'
    }
  },'.list')
}