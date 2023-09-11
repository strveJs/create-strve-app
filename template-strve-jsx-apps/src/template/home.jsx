import { setData, onMounted } from "strve-js";
import { linkTo } from "strve-router";
import logo from "../assets/logo.png";
export default class Home {
  constructor() {
    this.state = {
      msg: "hello",
      arr: [1, 2],
      count: 3,
    };
    onMounted(() => {
      console.log("HOME");
    });
  }

  goAbout = () => {
    linkTo({
      path: "/about",
      query: {
        id: 1,
        name: "maomin",
      },
    });
  };

  useChange = () => {
    setData(() => {
      this.state.msg = "world";
      this.state.count++;
      this.state.arr.unshift(this.state.count);
    });
  };

  render = () => (
    <fragment>
      <button onClick={this.goAbout}>goAbout</button>
      <h1>Home</h1>
      <div class="logo-inner">
        <img src={logo} class="logo" />
      </div>
      <p onClick={this.useChange}>{this.state.msg}</p>
      <ul>
        {this.state.arr.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </fragment>
  );
}
