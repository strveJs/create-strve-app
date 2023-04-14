import path from 'path';
import { defineConfig } from 'vite';
import { strve } from 'vite-plugin-strve';

const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': pathSrc,
		},
	},
	plugins: [strve()],
});
