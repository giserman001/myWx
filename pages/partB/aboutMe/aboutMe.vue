<template>
	<view class="aboutMe">
		<view class="imgWrapper">
			<u-image width="124rpx" height="124rpx" :src="src" :border-radius="10"></u-image>
			<view class="tit">
				嗨生活
			</view>
		</view>
		<view class="content">
			<text>
				“嗨生活”是以传统文化传播和产业化为主题的集小视频、资讯、即时通讯、直播四大工具于一体的融媒体平台。\n文化频道包含太极、中医和国学；商业频道包含房产、商城、酒店、机票、礼品卡等，和全方位的视角，为用户创建一个在线了解学习各类传统武术、中医和国学等传统文化的平台；\n一个在线沟通交流的文化交友、运动交友和爱好交友平台；一个为传统文化领域内机构和个人服务的平台。\n“嗨生活”与时俱进，以互联网思维来传承和传播中华传统文化，以文化产业化为导向，提供文化服务产品。
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/example/fade.jpg'
			};
		}
	}
</script>

<style lang="scss" scoped>
	.aboutMe {
		min-height: 100vh;
		background-color: #fff;
		padding: 60rpx 40rpx 0;
	}

	.imgWrapper {
		/deep/ .u-image {
			margin: 0 auto;
		}

		.tit {
			margin-top: 20rpx;
			letter-spacing: 14rpx;
			text-indent: 14rpx;
			text-align: center;
		}
	}
	.content{
		margin-top: 40rpx;
	}
</style>
