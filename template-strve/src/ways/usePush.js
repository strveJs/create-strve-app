import { updateView } from 'strvejs';
import { listState } from '../state/list.js';

function f2() {
  updateView(() => {
    listState.arr.push('3');
  });
}

function f3() {
  updateView(() => {
    listState.arr.splice(1, 1);
  });
}

export { f2, f3 };
