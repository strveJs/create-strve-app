import { setData } from 'strvejs';
import { initRouter } from 'strve-router';

import Home from '../template/home';
import About from '../template/about';

const router = initRouter(
	[
		{
			path: '/',
			template: [Home, 'render'],
		},
		{
			path: '/about',
			template: [About, 'render'],
		},
	],
	setData
);

export default router;
