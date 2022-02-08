import { updateView } from 'strvejs';
import {StrveRouter,routerHashUpdate} from 'strve-router';

import Home from '../template/home';
import About from '../template/about';

const router = StrveRouter([{
    path: '/',
    template: Home
}, {
    path: '/about',
    template: About
}]);

routerHashUpdate(updateView,()=>{
    console.log('router change');
});

export default router