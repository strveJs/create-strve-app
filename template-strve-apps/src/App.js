import { render } from './strve/index';
import strveRouter from './router/index';
function template() {
  return render`
        <div class='inner'>
        ${strveRouter.routerView()}
        </div>
    `;
}

export default template;