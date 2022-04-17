import { h } from 'strvejs';
import router from './router/index';

export default function App() {
	return h/*html*/ `
        <div class='inner'>
          ${router.view()}
        </div>
    `;
}
