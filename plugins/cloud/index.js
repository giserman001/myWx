// this.$cloud('global',{
// 	mark: 'global'
// },function(res){
// 	console.log(res)
// })

// let aaaa = await this.$cloud('global',{
// 	mark: 'global'
// })
// console.log(aaaa)

class cloudConfig {
	constructor(url, data, fn, loading) {
		this.url = url;
		this.data = data;
		this.fn = fn;
		this.loading = loading;
		this.loading && uni.showLoading({
			title: '加载中',
			mask: true
		});

	}
	cloudSyn() {
		uniCloud.callFunction({
				name: this.url,
				data: this.data
			}).then(res => {
				uni.hideLoading();
				if (res.success) {
					this.fn(res.result);
				} else {
					uni.showToast({
						title: '网络异常，请稍后再试!',
						icon: 'none',
					});
				}
			})
			.catch(err => {
				uni.hideLoading();
				console.log(err);
				uni.showToast({
					title: '网络异常，请稍后再试!',
					icon: 'none',
				});
			});

	}
	cloudAsy() {
		return new Promise((resolve, reject) => {
			uniCloud.callFunction({
					name: this.url,
					data: this.data
				})
				.then(res => {
					uni.hideLoading();
					if (!res.success) {
						reject('请求未成功');
						uni.showToast({
							title: '网络异常，请稍后再试!',
							icon: 'none',
						});
					} else {
						let data = res.result;
						if (data) {
							resolve(data);
						} else {
							reject('网络异常，请稍后再试1!');
							uni.showToast({
								title: '网络异常，请稍后再试!',
								icon: 'none',
							});
						}
					}
				})
				.catch(err => {
					uni.hideLoading();
					reject('网络异常，请稍后再试2!');
					uni.showToast({
						title: '网络异常，请稍后再试!',
						icon: 'none',
					});
				});
		});

	}

}

export default {
	clouds(url, mark = '', data = {}, fn = false, loading = false) {
		data.mark = mark;
		const cloudConfigs = new cloudConfig(url, data, fn, loading);
		if (fn) {
			cloudConfigs.cloudSyn();
		} else {
			return cloudConfigs.cloudAsy();
		}
	}
};
