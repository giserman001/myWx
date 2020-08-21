import Vue from 'vue';

// //挂在设置
import config from '../config/index.js';
Vue.prototype.$config = config;
// //挂载全局http请求
import $http from '../common/http/request.js';
Vue.prototype.$http = $http;

// //挂载全局util
import $api from '../common/api.js';
Vue.prototype.$api = $api;
