import { defineComponent } from 'strve-js';
import router from './router/index';
import './styles/app.css';

defineComponent(
    {
        mount: '#app',
    },
    () => {
        return () => <component $is={router.view()}></component>;
    }
);
