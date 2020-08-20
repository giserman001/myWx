<template>
	<view class="login">
		<view class="imgWrapper">
			<u-image width="124rpx" height="124rpx" :src="src" :border-radius="10"></u-image>
			<view class="tit">
				<u-divider color="#32323C" half-width="65" fontSize="32" border-color="#32323C">嗨生活</u-divider>
			</view>
			<view class="subtit">
				直购惠享 享受品质好生活
			</view>
		</view>
		<view class="formBox">
			<u-field v-model="mobile" label="手机号" placeholder="请填写手机号">
			</u-field>
			<u-field v-model="code" label="验证码" placeholder="请填写验证码">
				<u-button size="mini" slot="right" type="success" @click="getCode">{{codeText}}</u-button>
			</u-field>
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
		</view>
		<view class="btnWrappper">
			<u-button type="success" :custom-style="customStyle">手机短信验证码登录</u-button>
		</view>
		<view class="footer">
			登录即表明同意<text class="sty">《用户协议》</text>和<text class="sty">《隐私政策》</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '../../../static/images/logo-about.png',
				customStyle: {
					marginTop: '40rpx'
				},
				mobile: '',
				code: '',
				codeText: '获取验证码'
			}
		},
		methods: {
			codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		min-height: 100vh;
		background-color: #fff;
		padding: 60rpx 40rpx 0;
	}

	.imgWrapper {
		/deep/.u-image {
			margin: 0 auto;
		}

		.tit {
			margin-top: 40rpx;
			letter-spacing: 14rpx;
			text-indent: 14rpx;
			text-align: center;
			color: #32323C;
		}

		.subtit {
			text-align: center;
			color: #32323C;
			font-size: 30rpx;
			margin-top: 20rpx;
		}
	}

	.formBox {
		margin-top: 80rpx;
	}
	.footer{
		text-align: center;
		color: #A8A8A8;
		font-size: 24rpx;
		position: fixed;
		bottom: 40rpx;
		left: 50%;
		width: 100%;
		transform: translateX(-50%);
		.sty{
			color: #5F95F2;
		}
	}
</style>
