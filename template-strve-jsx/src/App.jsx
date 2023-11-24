import { homeCom, Home } from './template/home';
import { listCom, List } from './components/list';
import logo from './assets/logo.png';
import './style/app.css';

export default () => (
  <fragment>
    <div class='inner'>
      <div class='app-logo'>
        <img src={logo} class='logo' />
      </div>
      <h1>Hello Strve.js</h1>
      <div class='app-tool'>
        <component $name={homeCom}>{Home()()}</component>
        <component $name={listCom}>{List()()}</component>
      </div>
    </div>
  </fragment>
);
