import { render } from 'strvejs';
import Home from './template/home';

function template() {
  return render/*html*/`
        <div class='inner'>
            ${Home()}
        </div>
    `;
}

export default template;
