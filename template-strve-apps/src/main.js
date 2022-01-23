import { Strve } from 'strvejs';
import Template from './App.js';
import { state } from './template/home';

Strve('#app', {
  data: { state },
  template: Template,
});