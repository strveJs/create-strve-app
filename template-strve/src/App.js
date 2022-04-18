import { h } from 'strvejs';
import Home from './template/home';

function App() {
	return h/*html*/ `
        <div class='inner'>
            <component $name=${Home.name}>
                ${Home()}
            </component>
        </div>
    `;
}

export default App;
