import { Strve } from 'strvejs';
import template from './App.js';
import { state } from './template/home';

Strve('#app', {
  data: { state },
  template,
});

// HMR
if (import.meta.hot) {
  import.meta.hot.accept();
}