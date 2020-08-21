<template>
	<view>
		<view class="cu-custom" :style="[{ height: CustomBar + 'px' }]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage != '' ? 'none-bg text-white bg-img' : '', 'bg-' + setings.headColor]">
				<view class="action" @tap="BackPage" v-if="type == 'LR' || type == 'L'">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{ top: StatusBar + 'px' }]">
					<slot name="content">{{ pageName }}</slot>
				</view>
				<!-- #ifndef MP -->
				<view class="nav-right" @tap="showModal()"><slot name="right">菜单</slot></view>
				<!-- #endif -->
				
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="modalBox ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-grey" @tap="hideModal">取消</view>
					<view class="action" :class="'text-' + setings.mainColor" @tap="hideModal">确定</view>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(item, index) in checkbox" class="padding-xs" :key="index">
						<button
							class="cu-btn orange lg block"
							:class="item.checked ? 'bg-' + setings.mainColor : 'line-' + setings.mainColor"
							@tap="ChooseCheckbox(index)"
							:data-value="item.value"
						>
							{{ item.name }}
							<view class="cu-tag sm round" :class="item.checked ? 'bg-white text-' + setings.mainColor : 'bg-' + setings.mainColor" v-if="item.hot">HOT</view>
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			type: 'LR',
			setings: { taberColor: 'blue', headColor: 'gradual-blue' },
			notH5: true,
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			modalBox: false,
			checkbox: [
				{
					value: 0,
					name: '分享微信',
					checked: false,
					hot: false
				},
				{
					value: 1,
					name: '分享朋友圈',
					checked: true,
					hot: false
				}
			]
		};
	},
	computed: {
		...mapState(['navbar']),
		...mapState(['pageName']),
		style() {
			var StatusBar = this.StatusBar;
			var CustomBar = this.CustomBar;
			var bgImage = this.bgImage;
			var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			if (this.bgImage) {
				style = `${style}background-image:url(${bgImage});`;
			}
			return style;
		}
	},
	props: {
		isBack: {
			type: [Boolean, String],
			default: false
		},
		bgImage: {
			type: String,
			default: ''
		}
	},
	methods: {
		showModal(e) {
			this.modalBox = true;
		},
		hideModal(e) {
			this.modalBox = false;
		},
		ChooseCheckbox(index) {
			console.log('index' + index);
			this.checkbox.forEach((v, k) => {
				if (k == index) {
					this.checkbox[k].checked = true;
				} else {
					this.checkbox[k].checked = false;
				}
			});
		},
		BackPage() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style scoped>
.grid.col-3 > uni-view {
	width: 49%;
}
.nav-right {
	position: absolute;
	text-align: center;
	width: 100upx;
	right: 24rpx;
	height: 60upx;
	font-size: 24upx;
	line-height: 60upx;
	cursor: none;
	pointer-events: none;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
</style>
