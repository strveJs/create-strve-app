import { render, updateView } from 'strvejs'
import strveRouter from '../router/index.js'

export const state = {
    msg: "hello",
    arr:[1,2]
}

export default function Home() {
    return render/*html*/`
        <div>
            <button onClick="${goAbout}">goAbout</button>
            <h1>Home</h1>
            <p onClick="${useChange}">${state.msg}</p>
            <ul>
                ${state.arr.map((item) => render/*html*/`<li>${item}</li>`)}
            </ul>
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
        state.arr.push(3);
    })
}