import { updateView } from 'strvejs';
import StrveRouter from 'strve-router';

import Home from '../template/home';
import About from '../template/about';

const strveRouter = new StrveRouter([{
    path: '/',
    template: Home
}, {
    path: '/about',
    template: About
}]);

strveRouter.routerHashUpdate(updateView,()=>{
    console.log('router');
});

export default strveRouter