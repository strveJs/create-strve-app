import { setData } from "strve-js";

const homeState = {
  count: 0,
};

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

const Home = () => (
  <fragment>
    <button onClick={useAdd}>Add</button>
    <p>{homeState.count}</p>
    <input value={homeState.count}/>
  </fragment>
);

export default Home;
