import { h, setData } from 'strvejs';
import { linkTo } from 'strve-router';

export default class Home {
	constructor() {
		this.state = {
			msg: 'hello',
			arr: [1, 2],
		};
	}

	goAbout = () => {
		linkTo({
			path: '/about',
			query: {
				id: 1,
				name: 'maomin',
			},
		});
	};

	useChange = () => {
		setData(() => {
			this.state.msg = 'world';
			this.state.arr.push(3);
		});
	};

	render = () => {
		return h/*html*/ `
            <button onClick=${this.goAbout}>goAbout</button>
            <h1>Home</h1>
            <p onClick=${this.useChange} $key>${this.state.msg}</p>
            <ul $key>
                ${this.state.arr.map((item) => h/*html*/ `<li>${item}</li>`)}
            </ul>
        `;
	};
}
