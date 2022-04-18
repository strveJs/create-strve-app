import { h, setData } from 'strvejs';
import List from '../components/list';
import '../style/home.css';
import logo from '../assets/logo.png';

const homeState = {
	count: 0,
};

export default function Home() {
	return h/*html*/ `
    <div class='home'>
        <img src=${logo} class='logo'/>
        <h1>Hello Strve.js</h1>
        <button onClick=${useAdd}>Add</button>
        <div>
            <p $key>${homeState.count}</p>
            <input value="${homeState.count}" class="int" $key/>
        </div>
        <component $name=${List.name}>
            ${List()}
        </component>
    </div>
`;
}

function useAdd() {
	setData(() => {
		homeState.count++;
	});
}
