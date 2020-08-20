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
		<view class="btnWrappper">
			<u-button type="success" :custom-style="customStyle" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">微信一键登录</u-button>
			<navigator url="/pages/partB/phoneLogin/phoneLogin">
				<view class="phoneLogin">
					手机号码登录
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '../../../static/images/logo-about.png',
				customStyle: {
					marginTop: '500rpx'
				}
			}
		},
		methods: {
			appLoginWx() {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res, 'res', res.provider[0].indexOf('weixin'))
						if (res.provider[0] === 'weixin') {
							uni.login({
								provider: 'weixin',
								success: (res2) => {
									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => { //这里请求接口
											console.log(res2, 'res2');
											console.log(info, 'info');
										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})
								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})
						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
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

	.btnWrappper {
		.phoneLogin {
			text-align: center;
			color: #A5A5A5;
			font-size: 26rpx;
			margin-top: 20rpx;
		}
	}
</style>
