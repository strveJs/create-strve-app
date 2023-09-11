import { setData } from "strve-js";

const homeState = {
  count: 0,
};

export default function Home() {
  return html`
    <fragment>
      <button onClick=${useAdd}>Add</button>
      <p>${homeState.count}</p>
      <input value=${homeState.count} />
    </fragment>
  `;
}

function useAdd() {
  setData(
    () => {
      homeState.count++;
    },
    {
      name: Home,
    }
  );
}
