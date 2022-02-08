import { render,updateView } from 'strvejs'
import {routerLink,param2Obj} from 'strve-router'

function About(){
    return render/*html*/`
        <div>
            <button onClick="${goHome}">goHome</button>
            <h1 onClick=${getOption}>About</h1>
        </div>
    `
}

function goHome(){
    routerLink({
        path: '/'
    });
}

function getOption(){
    console.log(param2Obj());
}

export default About