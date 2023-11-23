import { linkTo, toParse } from "strve-router";

export default class About {
  goHome = () => {
    linkTo({
      path: "/",
    });
  };

  getOption = () => {
    console.log(toParse());
  };

  render = () => {
    return html`
      <fragment>
        <button onClick=${this.goHome}>goHome</button>
        <h1 onClick=${this.getOption}>About</h1>
      </fragment>
    `;
  };
}
