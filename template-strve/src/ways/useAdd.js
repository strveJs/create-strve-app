import { updateView } from 'strvejs';
import { f1state } from '../state/home.js';

function f1() {
  updateView(() => {
    f1state.obj.a++;
  });
}

export { f1 };
