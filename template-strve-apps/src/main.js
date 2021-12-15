import { Strve } from './strve/index';
import template from './App.js';
import { state } from './template/home';

Strve('#app', {
  data: { state },
  template,
});
