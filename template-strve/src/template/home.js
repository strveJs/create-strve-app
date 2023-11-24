import { setData, registerComponent } from 'strve-js';

export const homeCom = registerComponent('homeCom');

export function Home() {
  let count = 0;
  let render;

  function add() {
    setData(() => {
      count++;
    }, [homeCom, render]);
  }

  return (render = () =>
    html`
      <fragment>
        <button onClick=${add}>Add</button>
        <h1>${count}</h1>
        <input value=${count} />
      </fragment>
    `);
}
