import { render, updateView } from 'strvejs'
import strveRouter from '../router/index.js'

export const state = {
    msg: "hello"
}

function Home() {
    return render`
        <div>
            <button onclick="${goAbout}">goAbout</button>
            <h1 onclick="${useChange}">Home1</h1>
            <p>{state.msg}</p>
        </div>
    `
}

function goAbout() {
    strveRouter.routerLink({
        path: '/about',
        query: {
            id: 1,
            name: "maomin"
        }
    });
}

function useChange(){
    updateView(()=>{
        state.msg = 'world';
    })
}

export default Home