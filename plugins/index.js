import Vue from 'vue';

// //挂在设置
import config from './config/index.js';
Vue.prototype.$config = config;
// //挂载全局http请求
import $http from '../common/http/request.js';
Vue.prototype.$http = $http;














// import $AppEntryController from './AppEntryController/index.js'
// Vue.prototype.$AppEntryController = $AppEntryController;

// import * as $scalc from '../common/scalc';
// import $cloud from './cloud';
// Vue.prototype.$cloud = $cloud.clouds;

// //公用方法
// import $tool from './tools';
// Vue.prototype.$tool = $tool;

// import db from './uni-clientDB/index.js';
// Vue.prototype.$db = db;
// //挂在设置
// import config from '../config/config.js';
// Vue.prototype.$config = config;
// //挂载scalc
// import $scalc from './scalc';
// Vue.prototype.$scalc = $scalc;
// //挂载全局http请求
// import $http from './http';
// Vue.prototype.$http = $http;

// // #ifdef MP-WEIXIN
// //挂载全局微信分享
// // import { wxShare } from '@/config/util/utils'; 
// // Vue.prototype.wxShare = wxShare;
// // #endif
// //判断是否登录
// import { judgeLogin } from '@/config/util/login';
// Vue.prototype.judgeLogin = judgeLogin;

// // #ifdef H5
// //微信SDK
// import '@/plugins/utils/wxJsSDK.js';
// // #endif

// // http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
// import httpInterceptor from '@/common/http/http.interceptor.js';
// Vue.use(httpInterceptor, app);

// // http接口API抽离，免于写url或者一些固定的参数
// import httpApi from '@/common/http/http.api.js';
// Vue.use(httpApi, app);


// import $mUtils from '../common/utils';
// Vue.prototype.$mUtils = $mUtils;

// VueI18n
// import VueI18n from '../config/i18n/vue-i18n';
// Vue.use(VueI18n);
// const i18n = new VueI18n({
// 	// 默认语言
// 	locale: uni.getStorageSync('select') || 'zh-CN',
// 	// 引入语言文件
// 	messages: {
// 		'zh-CN': require('../config/i18n/zh-CN.js').lang,
// 		'en-US': require('../config/i18n/en-US.js').lang
// 	}
// });
// Vue.prototype._i18n = i18n;
