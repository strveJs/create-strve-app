import { h } from 'strvejs';
import Home from './template/home';

function App() {
	return h/*html*/ `
        <div class='inner'>
            ${Home()}
        </div>
    `;
}

export default App;
