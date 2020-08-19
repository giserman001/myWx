<template>
	<view class="mine">
		<view class="mineTop">
			<u-avatar :src="src" mode="circle" size="large"></u-avatar>
			<view class="mineWrapper">
				<view class="name">太极张三丰</view>
				<view class="account">账号：451256</view>
			</view>
		</view>
		<view class="optionWrapper">
			<u-cell-group>
				<u-cell-item  title="信息反馈"></u-cell-item>
				<u-cell-item  title="关于我们"></u-cell-item>
				<u-cell-item  title="用户协议"></u-cell-item>
				<u-cell-item  title="隐私政策"></u-cell-item>
				<u-cell-item  title="客服服务热线"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.mineTop {
		padding: 40rpx 20rpx;
		display: flex;
		background-color: #fff;
		.mineWrapper{
			flex: 1;
			padding-left: 20rpx;
			.name{
				font-weight: 700;
				font-style: normal;
				font-size: 16px;
				color: #1E1E1E;
			}
			.account{
				margin-top: 40rpx;
				font-size: 12px;
				color: #1E1E1E;
			}
		}
	}
	.optionWrapper{
		margin-top: 15rpx;
	}
</style>
