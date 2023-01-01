import router from './router/index';
import './styles/app.css';

export default function App() {
	return h/*html*/ `
        <div class='inner'>
          ${router.view()}
        </div>
    `;
}
