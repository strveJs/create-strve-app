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
  <>
    <button onClick={useAdd}>Add</button>
    <p $key>{homeState.count}</p>
    <input value={homeState.count} $key />
  </>
);

export default Home;
