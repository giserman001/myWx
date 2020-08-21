<template>
	<view class="feedBack">
		<view class="textarea">
			<u-input v-model="feedBack" type="textarea" :border="true" :maxlength="maxLength" :height="360" :auto-height="true" @input="inputFn" :clearable="false" />
			<view class="num">
				<text>{{num}}</text><text class="backslash">/</text><text>{{maxLength}}</text>
			</view>
		</view>
		<view class="btnQuit">
			<u-button type="error" shape="circle" :custom-style="customStyle">确定</u-button>
		</view>
	</view>
</template>

<script>
	// import {trim} from '../../../plugins/util.js'
	export default {
		data() {
			return {
				customStyle: {
					backgroundColor: '#F95251',
					marginTop: '40rpx'
				},
				feedBack: '',
				num: 0,
				maxLength: 225
			};
		},
		methods:{
			inputFn(e) {
				// const value = trim(e, 1)
				this.num = e.length
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feedBack{
		padding: 10rpx 20rpx;
		.textarea{
			position: relative;
			.u-input--border{
				background-color: #fff;
				border: none;
			}
		}
		.num{
			color: #828282;
			font-size: 12px;
			position: absolute;
			bottom: 10rpx;
			right: 10rpx;
			.backslash{
				margin: 0 5rpx;
			}
		}
	}
</style>
