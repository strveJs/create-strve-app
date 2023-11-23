import { setData, registerComponent } from 'strve-js';

export const homeCom = registerComponent();

const homeState = {
  count: 0,
};

function useAdd() {
  setData(() => {
    homeState.count++;
  }, [homeCom, Home]);
}

export const Home = () => (
  <fragment>
    <button onClick={useAdd}>Add</button>
    <p>{homeState.count}</p>
    <input value={homeState.count} />
  </fragment>
);
