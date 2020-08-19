<template>
	<view>
		<!-- 加载动画组件 -->
		<myLoading></myLoading>
		<myNavbar :type='type'></myNavbar>
		<myModel @comfig='comfig'></myModel>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序登录弹窗组件 -->
		<!-- <applets-login></applets-login> -->
		<!-- #endif -->
	</view>
</template>
  
<script>
	import config from '@/config/config'
	import myLoading  from '@/components/common/loading.vue'
	import myNavbar  from '@/components/common/headbar.vue'
	import myModel  from '@/components/common/model.vue'
	// #ifdef MP-WEIXIN
	// import appletsLogin  from "@/components/common/applets_login.vue"
	// #endif
	export default {
		components:{
			myLoading,
			myNavbar,
			myModel,
			// #ifdef MP-WEIXIN
			// appletsLogin
			// #endif
		},
		data(){
			return{
				type: 'LR',
				myModels:''
			}
		},
		methods:{
			comfig(res){
				this.myModels = res;
				console.log(res);
			}
		},
		mounted() {
			// #ifdef H5
			// this.notH5 = false;
			// #endif
		},
		watch: {
			myModels:{
				handler(){
					console.log(this.myModels);
					this.$emit('model', '123')
				}
			},
			type: {
				handler(){
					let route = getCurrentPages();
					if(route){
						route = route[route.length - 1].route;
						let pagesPower = config.pagesPower;
						let newP = pagesPower.filter(v=>{
							return v.url == route
						})
						if(newP.length>0){
							this.type = newP[0].type;
						}else{
							this.type = 'LR';
						}
					}
				},
				immediate:true
			}
		},
	};
</script>
<style lang="scss" scoped>

</style>
