<template>
    <view>
        <web-view @message="bindGetMsg" :src="url"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				url: '',
				messages:{},
				log:0
            }
        },
		onLoad(data) {
			uni.showModal({
				title:"H5跳转中转"
			})
			
			let id = data.id;
			switch (id){
				case 1:
				//协议
				This.url = 'https://www.shxhui.com/fphone/page/power.html'
					break;
				case 2:
				//邀请记录
				This.url = 'https://www.shxhui.com/fphone/page/inviter.html?user='+user_id;
					break;
				case 3:
				//协议
				This.url = 'https://www.shxhui.com/fphone/page/power.html'
					break;	
				case 4:
				//资料
				This.url = 'https://www.shxhui.com/fphone/page/app_data.html?line=weix&user='+user_id+'&data='+urlData;
					break;	
				case 5:
				//轮播
				This.url = urlData;
					break;	
				case 6:
				//身份证
				This.url = 'https://www.shxhui.com/fphone/page/OCR.html?user='+user_id+'&line=weix'+'&data='+urlData;
					break;	
				case 7:
				//招聘
				This.url = 'https://www.shxhui.com/fphone/page/Z_recruit.html?user='+user_id+'&line=weix';
					break;		
				case 8:
				//我的通告
				This.url = 'https://www.shxhui.com/fphone/page/X_actor_related.html?user='+user_id+'&line=weix'; 
					break;
				case 9:
				//任务
				This.url = 'https://www.shxhui.com/wx/10?'+urlData; 
					break;	
				default:
				This.url = urlData;
					break;
			}
		},
		onShow() {
			uni.showShareMenu({
				withShareTicket: true
			})
		},
		
		methods: {  
            bindGetMsg(evt) { 
				evt = evt.detail.data[0];
				console.log(evt)
				this.log = evt.log||0;
				if(this.log == '1'){//结算链接
					this.messages = evt
				}
            }  
			
        },
		onShareAppMessage(res) {
			if(this.log === '1'){//结算链接
				if (res.from === 'button') { // 来自页面内分享按钮
					console.log(res.target)
				}
				return {
					title: '结算链接',
					path: '/pagesB/pay_link?item=' + this.messages.Item + '&partId='+ this.messages.part_id +'&rode=' + this.messages.rode,
					withShareTicket: true
				}
			}
		}
    }
</script>

<style>

</style>