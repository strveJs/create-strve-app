import { render } from 'strvejs';
import router from './router/index';

export default function App() {
  return render`
        <div class='inner'>
          ${router.routerView()}
        </div>
    `;
}