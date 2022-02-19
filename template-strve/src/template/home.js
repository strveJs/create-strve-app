import { render,updateView } from 'strvejs';
import List from '../components/list';
import '../style/home.css';
import logo from '../assets/logo.png';

export const homeState = {
    obj: {
      a: 1,
    },
    txt:'txt',
    h1Style:{
      color: '#C6715B'
  }
};

export default function Home() {
  return render/*html*/`
    <div class='home'>
        <img src=${logo} class='logo'/>
        <h1 style=${homeState.h1Style}>Hello Strve.js</h1>
        <div>
            <button onClick=${useAdd}>Add</button>
            <p>${homeState.obj.a}</p>
            <input value="${homeState.obj.a}" class="int"/>
        </div>
        <div class='list' onUseGetTit=${useGetTit}>
          ${List(homeState.txt)}
        </div>
    </div>
`;
}

function useGetTit(v){
  console.log(v.detail.tit); // "This is title."
}

function useAdd() {
  updateView(() => {
      homeState.obj.a++;
  });
}
