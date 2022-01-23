import { render,updateView } from 'strvejs'
import strveRouter from '../router/index.js'

function About(){
    return render/*html*/`
        <div>
            <button onClick="${goHome}">goHome</button>
            <h1 onClick=${getOption}>About</h1>
        </div>
    `
}

function goHome(){
    strveRouter.routerLink({
        path: '/'
    });
}

function getOption(){
    console.log(strveRouter.param2Obj());
}

export default About