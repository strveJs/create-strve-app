import { render } from 'strvejs';
import { home, list } from './template/index.js';

function template() {
  return render`
        <div class='inner'>
            ${home()}
            ${list()}
        </div>
    `;
}

export default template;
