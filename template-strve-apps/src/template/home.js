import { render, updateView } from '../strve/index'
import strveRouter from '../router/index.js'

export const state = {
    msg: "hello"
}

function Home() {
    return render`
        <div>
            <button onclick="${goAbout}">goAbout</button>
            <h1>Home</h1>
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

// HMR
if (import.meta.hot) {
    import.meta.hot.accept((vs) => {
        updateView(() => {
            strveRouter.nextUpdateView(vs.default(),'/');
        })
    });
}

export default Home