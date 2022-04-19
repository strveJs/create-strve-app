import { h, setData } from 'strvejs';

const homeState = {
	count: 0,
};

export default function Home() {
	return h/*html*/ `
        <button onClick=${useAdd}>Add</button>
        <p $key>${homeState.count}</p>
        <input value="${homeState.count}"  $key/>
`;
}

function useAdd() {
	setData(
		() => {
			homeState.count++;
		},
		{
			name: Home,
		}
	);
}
