<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		}, 
		onLoad() {
			// this.$http.post()
			// console.log()
			this.$http.post('video/list/',2,function(res){
				console.log(res)
			})
			// 	let clientkey = '74becec2775b4b003a62367b5bf4a651';
			// 	let timestamp = String(Date.parse(new Date()));
			// 	var salt = "menshen_2018";
			// 	let sign = md5(clientkey+timestamp+salt);
			// 	console.log(sign)
			// uni.request({
			//     url: 'http://apitest.tjkongfu.com:4000/union/video/list/', //仅为示例，并非真实接口地址。
			//     data: {
			//     },
			// 	method:'POST',
			//     header: {
			// 		clientkey:clientkey,
			// 		timestamp:timestamp,
			// 		'sign':sign
					
			//     },
			//     success: (res) => {
			//         console.log(res.data);
			//         this.text = 'request success';
			//     }
			// });
			
			
			
		},
		methods: {

		}
	}
</script>

<style>
	
</style>
