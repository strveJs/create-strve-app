import { render } from 'strvejs';
import { listState } from '../state/list.js';
import '../style/list.css';
import { f2, f3 } from '../ways/usePush.js';

function list() {
  return render`
    <div class='list'>
        <button id='btn2' onclick=${f2}>Push</button>
        <button id='btn3' onclick=${f3}>Del</button>
        <ul class="list-inner">
            ${listState.arr.map((todo) => render`<li key=${todo}>${todo}</li>`)}
        </ul>
    </div>
`;
}

export { list };
