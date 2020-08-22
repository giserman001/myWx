<template>
	<view class="myMap">
		<publicModule></publicModule>
		<view class="myMap-me" v-if="nowCity">
			<view class="myMap-title"><view class="icon1"></view>定位城市</view>
			<view style="margin-left: 5rpx; overflow: hidden;">
				<view @click="HJunp(nowCity)" class="myMap-city">{{nowCity}}</view>
			</view>
		</view>
		
		<view class="myMap-me">
			<view class="myMap-title"><view class="icon2"></view></image> 热门城市</view>
			<view style="margin-left: 5rpx; overflow: hidden;">
				<view class="myMap-city" v-for="(item, i) in hot" :key="i" @click="HJunp(item.city_name)">{{ item.city_name }}</view>
			</view>
		</view>
		 
		
		<u-index-list :scrollTop="scrollTop" :index-list="indexList" class="myMap-me">
			<view v-for="(item, index) in all" :key="index" style="overflow: hidden;">
				<u-index-anchor :index="item.pyKey" style="margin-bottom: 20rpx;" />
				<view class="myMap-city" @click="AJump(index,i)" v-for="(city, i) in item.pyArr" :key="i">
					{{city.city_name}}
				</view>
			</view>
		</u-index-list>
		
	</view>
</template>

<script>	
import py from  './lib/PY.js'
export default {
	name: 'myMap',
	data() {
		return {
			scrollTop:0,
			indexList:[],
			nowCity:'定位中...',
			hot: [],
			all: []
		};
	},
	methods: {
		HJunp(data){
			this.$api.setSite('city', data);
			this.$u.route({
				url:'pages/partB/houseList/houseList',
				type:'tab',
				params:{
					city:data
				}
			})
		},
		AJump(index,i){
			let City = this.all[index].pyArr[i].city_name;
			this.$api.setSite('city', City);
			this.$u.route({
				url:'pages/partB/houseList/houseList',
				type:'tab',
				params:{
					city:City
				}
			})
		}	
	},
	mounted() {
		var This = this;
		uni.getLocation({
		    type: 'wgs84',
		    success: function (res) {
				wx.request({
				  url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=${This.$config.wxMapKey}&get_poi=1`,
				  success:res=>{
					  console.log(res.data)
					  if(res.statusCode===200){
						  This.nowCity = res.data.result.address_component.city
					  }
					}
				});
		    }
		});
		
		This.all =  [{"pyKey":"A","pyArr":[{"city_id":"8102","city_name":"澳门","count":"1","lng":0,"lat":0,"target_id":""}]},{"pyKey":"D","pyArr":[{"city_id":"786","city_name":"大同","count":"1","lng":113.290509,"lat":40.113744,"target_id":""}]},{"pyKey":"H","pyArr":[{"city_id":"1012","city_name":"海口","count":"2","lng":110.330802,"lat":20.022071,"target_id":""},{"city_id":"900","city_name":"杭州","count":"1","lng":120.219375,"lat":30.259244,"target_id":""},{"city_id":"885","city_name":"合肥","count":"7","lng":117.282699,"lat":31.866942,"target_id":""}]},{"pyKey":"J","pyArr":[{"city_id":"902","city_name":"嘉兴","count":"1","lng":120.760428,"lat":30.773992,"target_id":""}]},{"pyKey":"N","pyArr":[{"city_id":"855","city_name":"南京","count":"1","lng":118.778074,"lat":32.057236,"target_id":""}]},{"pyKey":"S","pyArr":[{"city_id":"1111","city_name":"三亚","count":"11","lng":109.522771,"lat":18.257776,"target_id":""},{"city_id":"1132","city_name":"上海","count":"7","lng":121.472188,"lat":31.235317,"target_id":""},{"city_id":"867","city_name":"苏州","count":"1","lng":120.619907,"lat":31.317987,"target_id":""}]},{"pyKey":"T","pyArr":[{"city_id":"294","city_name":"台湾","count":"1","lng":0,"lat":0,"target_id":""}]},{"pyKey":"X","pyArr":[{"city_id":"8101","city_name":"香港","count":"1","lng":0,"lat":0,"target_id":""}]}]
		This.indexList = ["A","D","H","J","N","S","T","X"]
		This.hot = [{"city_id":0,"city_name":"全国","count":"35","lng":"0","lat":"0"},{"city_id":"1111","count":"11","city_name":"三亚","lng":109.522771,"lat":18.257776,"target_id":""},{"city_id":"885","count":"7","city_name":"合肥","lng":117.282699,"lat":31.866942,"target_id":""},{"city_id":"1132","count":"7","city_name":"上海","lng":121.472188,"lat":31.235317,"target_id":""},{"city_id":"1012","count":"2","city_name":"海口","lng":110.330802,"lat":20.022071,"target_id":""},{"city_id":"902","count":"1","city_name":"嘉兴","lng":120.760428,"lat":30.773992,"target_id":""},{"city_id":"900","count":"1","city_name":"杭州","lng":120.219375,"lat":30.259244,"target_id":""},{"city_id":"8101","count":"1","city_name":"香港","lng":0,"lat":0,"target_id":""},{"city_id":"8102","count":"1","city_name":"澳门","lng":0,"lat":0,"target_id":""},{"city_id":"294","count":"1","city_name":"台湾","lng":0,"lat":0,"target_id":""},{"city_id":"855","count":"1","city_name":"南京","lng":118.778074,"lat":32.057236,"target_id":""}]
		
		//定位
		// this.$http.post('/union/house/city/',{},
		// function(res){
		// 	console.log(res)
		// 	if(res.status === 1){
		// 		let all = res.data.all;
		// 		//获取拼音
		// 		let PYjson = [];
		// 		let PYARR = []
		// 		for(var i in all){
		// 			if(PYjson[py.makePy(all[i].city_name)]){
		// 				PYjson[py.makePy(all[i].city_name)].arr.push(all[i])
		// 			}else{
		// 				PYARR.push(py.makePy(all[i].city_name))
		// 				PYjson[py.makePy(all[i].city_name)]={
		// 					py:py.makePy(all[i].city_name),
		// 					arr: [(all[i])]
		// 				}
		// 			}
		// 		}
		// 		let pyAll = [];
		// 		for(let key in PYjson){
		// 			pyAll.push({
		// 				pyKey:key,
		// 				pyArr:PYjson[key].arr
		// 			})
		// 		}
		// 		console.log(JSON.stringify(pyAll))
		// 		console.log(JSON.stringify(PYARR))
		// 		console.log(JSON.stringify(res.data.hot))
		// 		This.all = pyAll;
		// 		This.indexList = PYARR;
		// 		This.hot = res.data.hot;
		// 	}
		// })
		
	}
};
</script>

<style lang="scss" scoped>
.myMap {
	background: #ffffff;
	
	&-title{
		height: 60rpx;
		line-height: 60rpx;
		padding-left: 28rpx;
		background: #ededed;
		color: #a1a1a1;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		.icon1{
			margin-top: 15rpx;
			margin-right: 12rpx;
			height: 30rpx;
			width: 24rpx;
			// background: url(./lib/attention.png) no-repeat;
			background-size: auto 100%;
			float: left;
		}
		.icon2{
			margin-top: 15rpx;
			margin-right: 12rpx;
			height: 30rpx;
			width: 24rpx;
			// background: url(./lib/attention.png) no-repeat;
			background-size: auto 100%;
			float: left;
		}
	}	
	&-city {
		text-align: center;
		line-height: 70rpx;
		background: #f4f4f4;
		border-radius: 10rpx;
		width: 200rpx;
		margin-left: 20rpx;
		float: left;
		height: 70rpx;
		margin-bottom: 20rpx;
		
	}
	&-me{
		width: 100vw;
	}
}
</style>
