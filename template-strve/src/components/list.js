import { h, setData } from 'strvejs';
import style from '../style/list.module.css';

const listState = {
	arr: [1, 2],
};

export default function List() {
	return h/*html*/ `
		<div class="${style.listInner}">
			<button onClick=${useUnshift}>Unshift</button>
			<button onClick=${usePush}>Push</button>
			<button onClick=${useDel}>Del</button>
		</div>
        <ul class="${style.listInner}" $key>
            ${listState.arr.map((item) => h/*html*/ `<li $key>${item}</li>`)}
        </ul>
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
			status: 'useFirstKey',
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
