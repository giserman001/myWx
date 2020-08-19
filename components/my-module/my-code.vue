<template>
	<view>
		<view @click.stop="clicks" :class="holdTime === 60 ? 'noColor' : 'Color'">{{ setWord || getCodeText }}</view>
	</view>
</template>

<script>
export default {
	name: 'myCode',
	props: {
		mobile: {
			type: String,
			default: ''
		},
		user: {
			type: String,
			default: ''
		},
		getCodeText: {
			type: String,
			default: '获取验证码'
		}
	},
	data() {
		return {
			class: '',
			getCodeOnoff: true,
			code: '',
			holdTime: 60,
			setWord: ''
		};
	},
	destroy() {
		clearInterval(that.Timer);
		this.holdTime = 60;
	},
	Timer: {},

	methods: {
		async sms() {
			let res = {};
			if (this.mobile) {
				this.$clouds.cloud('sms',{ mark: 'mobile', mobile: this.mobile },res=>{
					console.log(res);
					if (res.oret === 1) {
						this.$emit('onCode', res.info);
					} else {
						this.$emit('onCode', "");
						uni.showToast({
							title: res.mess,
							icon: 'none'
						});
					}
				})
			} else {
				this.$emit('onCode', "");
				uni.showToast({
					title: res.mess,
					icon: 'none'
				});
			}
		},
		clicks() {
			let that = this;
			console.log(this.mobile);
			uni.hideKeyboard();
			if (!that.getCodeOnoff) {
				return;
			}
			if (!/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(that.mobile)) {
				uni.showToast({
					title: '请填写正确手机号码',
					icon: 'none'
				});
				return;
			}
			that.getCodeOnoff = false;
			that.setWord = '发送中...';
			that.Timer = setInterval(() => {
				if (that.holdTime <= 0) {
					that.getCodeOnoff = true;
					that.setWord = '';
					that.holdTime == 60;
					clearInterval(that.Timer);
					return;
				} else if (that.holdTime == 60) {
					that.sms();
					that.holdTime--;
				} else {
					that.setWord = '重新获取(' + that.holdTime + ')';
					that.holdTime--;
				}
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
.noColor {
	color: #999;
}
.Color {
	color: #999;
}
</style>
