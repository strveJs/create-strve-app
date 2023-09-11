import Home from "./template/home";
import List from "./components/list";
import logo from "./assets/logo.png";
import "./style/app.css";

function App() {
  return html`
    <div class="inner">
      <div class="app-logo">
        <img src=${logo} class="logo" />
      </div>
      <h1>Hello Strve.js</h1>
      <div class="app-tool">
        <component $name=${Home.name}>${Home()}</component>
        <component $name=${List.name}>${List()}</component>
      </div>
    </div>
  `;
}

export default App;
