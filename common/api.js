module.exports = {
	setSite(name,Json){
		let site = uni.getStorageSync('site') || {};
		site[name] = Json;
		uni.setStorageSync('site', site);
	},
	getSite(name = ''){
		return name ? uni.getStorageSync('site')[name] || '' : uni.getStorageSync('site') || '';
	},
};
