<template>
	<view>
		<!-- 加载动画组件 -->
		<myLoading></myLoading>
		<!-- <myNavbar :type='type'></myNavbar> -->
	</view>
</template>
  
<script>
	import myLoading  from '@/components/common/loading.vue'
	export default {
		components:{
			myLoading,
			// myNavbar,
		},
		data(){
			return{
			}
		},
		watch: {
			
		},
	};
</script>
<style lang="scss" scoped>

</style>
