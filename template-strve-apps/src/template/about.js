import { render,updateView } from '../strve/index'
import strveRouter from '../router/index.js'

function About(){
    return render`
        <div>
            <button onclick="${goHome}">goHome</button>
            <h1>About1</h1>
        </div>
    `
}

function goHome(){
    strveRouter.routerLink({
        path: '/'
    });
}

// HMR
if (import.meta.hot) {
    import.meta.hot.accept((vs) => {
        updateView(() => {
            strveRouter.nextUpdateView(vs.default(),'/about');
        })
    });
}

export default About