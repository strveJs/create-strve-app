import { render } from 'strvejs';
import Home from './template/home';

function App() {
  return render/*html*/`
        <div class='inner'>
            ${Home()}
        </div>
    `;
}

export default App;
