import { setData, registerComponent } from 'strve-js';

export default function Home() {
  let [homeCom, render] = [registerComponent()];
  let count = 0;

  function add() {
    setData(() => {
      count++;
    }, [homeCom, render]);
  }

  return (render = () =>
    html`
      <fragment $id=${homeCom}>
        <button onClick=${add}>Add</button>
        <h1>${count}</h1>
        <input value=${count} />
      </fragment>
    `);
}
