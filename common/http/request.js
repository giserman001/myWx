import md5 from 'js-md5';
import store from '../store/index.js';
import config from '../../config/index.js';
export default {
	post(url, data = {}, fn, loading = true) {
		loading && store.commit('setLoadingShow', true);
		let timestamp = String(Date.parse(new Date()));
		let sign = md5(config.clientkey + timestamp + config.salt);
		uni.request({
			url: config.baseUrl + url, //仅为示例，并非真实接口地址。
			data,
			method: 'POST',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				clientkey: config.clientkey,
				timestamp,
				sign: sign,
				platform: config.platform,
				version: config.version,
				uuid: config.uuid
			},
			success: (res) => {
				console.log(res);
				store.commit('setLoadingShow', false);
				if (res.statusCode === 200) {
					fn(res.data);
				} else {
					uni.showToast({
						title: '网络异常，请稍后再试!',
						icon: 'none',
					});
				}
			}
		});
	}
};
