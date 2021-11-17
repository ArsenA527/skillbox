import Vue from 'vue';
import App from './App.vue';
import store from './store';
import {
  message1,
  message2,
} from './data';
import getMessage from './getMessage';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

alert(getMessage(message1));
alert(getMessage(message2));
