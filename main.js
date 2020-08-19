import Vue from 'vue';
import App from './App';
import './plugins';
Vue.config.productionTip = false;

App.mpType = 'app';

Vue.prototype.vuePrototype = '枣红';
import uView from 'uview-ui';
Vue.use(uView);
 
import store from './common/store';
let vuexStore = require('./common/store/$u.mixin.js');
Vue.mixin(vuexStore);


const app = new Vue({
    ...App,
	store
});
app.$mount();
