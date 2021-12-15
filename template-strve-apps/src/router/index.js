import { updateView } from '../strve/index';
import StrveRouter from '../strve-router/hash/index';

import Home from '../template/home';
import About from '../template/about';

const strveRouter = new StrveRouter([{
    path: '/',
    template: () => import('../template/home')
}, {
    path: '/about',
    template: () => import('../template/about')
}]);

strveRouter.routerHashUpdate(updateView, () => {
    console.log('router');
});

export default strveRouter