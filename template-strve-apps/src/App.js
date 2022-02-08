import { render } from 'strvejs';
import router from './router/index';

export default function Template() {
  return render`
        <div class='inner'>
          ${router.routerView()}
        </div>
    `;
}