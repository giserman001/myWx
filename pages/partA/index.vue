<template>
	<view class="main">
		<publicModule></publicModule>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		},
		onShow() {
			// this.$http.post('/union/video/list/',{
				// adv_type :'live'
			// },function(res){
			// 	console.log(res);
			// })
			
			this.$http.post('/union/login/verify/',{
				username : '102028',
				password: '123456',
				type :'3',
				country_code:'',
				open_id:'',
				form:'',
				uuid:'',
				lng:'',
				lat:''
			},function(res){
				console.log(res);
			})
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
