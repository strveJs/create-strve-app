import { render } from 'strvejs';
import strveRouter from './router/index';

export default function Template() {
  return render`
        <div class='inner'>
        ${strveRouter.routerView()}
        </div>
    `;
}
