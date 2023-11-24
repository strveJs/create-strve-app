import { setData, onMounted } from 'strve-js';
import { linkTo } from 'strve-router';
import logo from '../assets/logo.png';

export default function home() {
  const state = {
    msg: 'hello',
    arr: [1, 2],
    count: 3,
  };
  let render;

  onMounted(() => {
    console.log('HOME mount');
  });

  function goAbout() {
    linkTo({
      path: '/about',
      query: {
        id: 1,
        name: 'maomin',
      },
    });
  }

  function useChange() {
    setData(() => {
      state.msg = 'world';
      state.count++;
      state.arr.unshift(state.count);
    });
  }

  return (render = () => (
    <fragment>
      <button onClick={goAbout}>goAbout</button>
      <h1>Home</h1>
      <div class='logo-inner'>
        <img src={logo} class='logo' />
      </div>
      <p onClick={useChange}>{state.msg}</p>
      <ul>
        {state.arr.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </fragment>
  ));
}
