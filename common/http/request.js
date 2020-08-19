import md5 from 'js-md5';
import config from "../../plugins/config/index.js"
export default {
	post(url, data = {}, fn) {
		let clientkey = '74becec2775b4b003a62367b5bf4a651';
		let timestamp = String(Date.parse(new Date()));
		var salt = 'menshen_2018';
		let sign = md5(clientkey + timestamp + salt);
		uni.request({
			url: config.baseUrl + url, //仅为示例，并非真实接口地址。
			data,
			method: 'POST',
			header: {
				clientkey,
				timestamp,
				sign
			},
			success: (res) => {
				fn(res);
			}
		});
	}
};