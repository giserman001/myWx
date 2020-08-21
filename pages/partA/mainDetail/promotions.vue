/**
*优惠活动
*/
<template>
    <div class="promotionsPanel">
        <div class="prt-title">优惠活动</div>
        <!-- 优惠券 -->
        <div class="prtPanel">
           <!-- 优惠券 -->
            <div class="promotBox coupon couponbg" v-if="detailInfo.house_coupon != ''">
                <div class="coupon-left">
                    <p class="l_title">{{detailInfo.house_coupon.title}}</p>
                    <p class="l_subtitle">{{detailInfo.house_coupon.subtitle}}</p>
                </div>
                <div class="coupon-right">
                    <div class="r_btn " v-if="detailInfo.house_coupon.is_enroll==0" @click="handMeth('coupon')">立即领取</div>
                    <div class="r_btn r_btn2" v-else>已领取</div>
                    <div class="r_btn share_Btn" v-if="userInfo.userRole > 0"
                    @click="handBridgeCallhandler({type:'share',house_id:house_id,shareAppendParams:'&houseType=coupon'})"
                    >立即分享</div>
                </div>
            </div>
            <!-- 折扣券 -->
            <div class="promotBox coupon discountBg" v-if="detailInfo.house_discount != ''">
                <div class="coupon-left">
                    <p class="l_title">{{detailInfo.house_discount.title}}</p>
                    <p class="l_subtitle">{{detailInfo.house_discount.subtitle}}</p>
                </div>
                <div class="coupon-right">
                    <div class="r_btn " v-if="detailInfo.house_discount.is_enroll==0" @click="handMeth('discount')">立即领取</div>
                    <div class="r_btn r_btn2" v-else>已领取</div>
                    <div class="r_btn share_Btn" v-if="userInfo.userRole > 0"
                      @click="handBridgeCallhandler({type:'share',house_id:house_id,shareAppendParams:'&houseType=discount'})"
                      >立即分享</div>
                </div>
            </div>

            <!-- 预约看房 -->
            <div class="promotBox reserve reserveBg" v-if="detailInfo.house_appointment!=''">
                <div class="reserve-left">
                    <p class="l_title">{{detailInfo.house_appointment.title}}</p>
                    <p class="l_subtitle">{{detailInfo.house_appointment.subtitle}}</p>
                </div>
                <div class="reserve-right">
                    <div class="r_btn" v-if="detailInfo.house_appointment.is_enroll==0" @click="handMeth('appointment')">预约看房</div>
                    <div class="r_btn" v-else>已预约</div>
                </div>
            </div>
            <!-- 团购 -->
            <div class="promotBox reserve reserveBg" v-if="detailInfo.house_groupbuy!=''">
                <div class="reserve-left">
                    <p class="l_title">{{detailInfo.house_groupbuy.title}}</p>
                    <p class="l_subtitle">{{detailInfo.house_groupbuy.subtitle}}</p>
                </div>
                <div class="reserve-right">
                    <div class="r_btn" v-if="detailInfo.house_groupbuy.is_enroll==0" @click="handMeth('groupbuy')">立即报名</div>
                    <div class="r_btn" v-else @click="handMeth('groupbuy')">已报名</div>
                </div>
            </div>
            <!-- 金融支持政策 -->
            <div class="promotBox reserve reserveBg" v-if="detailInfo.house_policy!=''">
                <div class="reserve-left">
                    <p class="l_title">{{detailInfo.house_policy.title}}</p>
                    <p class="l_subtitle">{{detailInfo.house_policy.subtitle}}</p>
                </div>
                <div class="reserve-right">
                    <div class="r_btn" v-if="detailInfo.house_policy.is_enroll === 0" @click="handMeth('policy')">付费咨询</div>
                    <div class="r_btn" v-else @click="gotoPolicy">在线咨询</div>
                </div>
            </div>
            <!-- 咨询更多优惠 -->
            <div class="consultMore" v-if="detailInfo.seller_id !== userInfo.id" @click="handBridgeCallhandler({type:'zygw',seller_id:detailInfo.seller_id})" ref="more">咨询更多优惠</div>
        </div>

        <vanOverlay
          :isShowTip="isShowTipFloat"
          v-if="detailInfo"
          :detailList="detailInfo"
          :key="new Date().getTime()"
          :enrollType="enrollType"
          @handClose="handClose"
          @receivedSuccessfully = "receivedSuccessFully"
          @childBridgeCallhandler = "handBridgeCallhandler"
          ></vanOverlay>
    </div>
</template>

<script>
import Vue from 'vue';
import { Button, Overlay, Dialog, Toast } from 'vant';
import vanOverlay from './component/vanOverlay';
import propertyDetails from '@/services/api/propertyDetails';

Vue.use(Button).use(Overlay).use(Dialog);
Vue.use(Toast);
export default {
  name: 'promotions',
  components: {
    vanOverlay
  },
  props: {
    detailInfo: {
      type: Object,
      default: null
    },
    house_id: {
      type: String
    }
  },
  data() {
    return {
      isShowTipFloat: false,
      enrollType: '',
      shareInfo: {},
      paramsConfig: {},
      userInfo: {
        userRole: -1
      },
      tipTimer: null,
      addEventClick: false
    };
  },
  mounted() {
    this.shareInfo = this.storage.get('shareInfo');
    this.userInfo = this.storage.get('userInfo');
    this.paramsConfig = this.storage.get('estate_config');

    if (this.shareInfo) {
      console.log(this.detailInfo.house_discount)
      // if (this.Webkit.isDebug) this.shareInfo.re_type = 'houseDiscount';
      // 点优惠券分享进来的
      if (this.shareInfo.re_type === 'houseCoupon' && this.detailInfo.house_coupon != '') {
        this.enrollType = 'coupon';
        this.showTipFloat();
      } else if (this.shareInfo.re_type === 'houseDiscount' && this.detailInfo.house_discount.length != '') {
        this.enrollType = 'discount';
        this.showTipFloat();
      }
    }
    // 支付回调
    window.H5Callback = (data) => {
      this.mobileH5Callback(data);
    };
  },
  methods: {
    // app调H5方法 window下
    mobileH5Callback(data) {
      const _data = JSON.stringify(data);

      if (parseInt(_data) === 0) {
        this.isShowTipFloat = false;
        if (this.enrollType === 'discount' || this.enrollType === 'coupon') {
          Toast('领取成功');
        } else if (this.enrollType === 'policy') {
          Dialog.close();
          this.handBridgeCallhandler({ type: 'zygw', seller_id: this.detailInfo.house_policy.target_id });
        }
        this.$emit('successFully');
      } else {
        Dialog.close();
        this.isShowTipFloat = false;
        Toast('支付失败');
      }
    },
    showTipFloat() {
      clearTimeout(this.tipTimer);
      this.tipTimer = setTimeout(() => {
        if (this.Webkit.isApp()) {
          this.handBridgeCallhandler({ type: 'openFlag' });
        }
        this.isShowTipFloat = true;
      }, 100);
    },
    // 获取到类型给子组件
    handMeth(type) {
      this.enrollType = type;
      if (this.Webkit.isApp()) {
        this.handBridgeCallhandler({ type: 'openFlag' });
      }
      if (type === 'policy') {
        Dialog.confirm({
          title: this.detailInfo.house_policy.title,
          message: this.detailInfo.house_policy.tip,
          messageAlign: 'left',
          confirmButtonText: '确定支付',
          beforeClose: this.beforeClose
        }).then(() => {
          this.saveEnroll();
        }).catch(() => {
          // on cancel
        });
      } else {
        this.showTipFloat();
      }
    },
    // 用户报名接口提交
    async saveEnroll() {
      const params = {
        access_token: this.paramsConfig.access_token,
        house_id: this.paramsConfig.house_id,
        enroll_type: this.enrollType,
        phone: this.userInfo.phone,
        share_code: this.paramsConfig.share_code
      };
      const _data = await propertyDetails.houseEnroll(params);

      if (_data.status === 1) {
        const _parms = {
          type: 'pay_strategy',
          order_info: _data.data
        };

        this.handBridgeCallhandler(_parms);
        this.receivedSuccessFully();
      } else {
        Toast(_data.msg);
      }
    },
    // 关闭浮层
    handClose() {
      this.isShowTipFloat = false;
    },
    // 提交成功
    receivedSuccessFully() {
      this.$emit('successFully');
    },
    // 调原生方法
    handBridgeCallhandler(params) {
      this.$emit('handBridgeCallhandler', params);
    },
    // 查看金融政策
    gotoPolicy() {
      this.$emit('gotoPolicy');
    }
  }
};
</script>
<style lang="less" scoped>
/** 用于less变量声明 */
@bg_color: #f5f5f5;        // 背景色
@centBgColor: #ffffff;      // placeholder颜色
@deep_gray_color: #757575; // 深一点的灰色
@black_color: #333;        // 标题颜色
@blue_color: #265ae0;      // 按钮颜色 字体颜色
@border_color: #e6e6e6;    // 边框颜色
@fontSize:1rem;
/**优惠活动**/
.promotionsPanel{
    background-color: @centBgColor;
    margin-top: 0.5rem;
    padding: 1rem;
    font-size: .95rem;
    .prt-title{
        font-size: .95rem;
        font-weight: bold;
    }
    .prtPanel{
        display: flex;
        flex-direction: column;
        padding-top: .5rem;
        .coupon{
            padding: 0.75rem 0.75rem;
            display: flex;
            flex-direction: row;
            color: #ffffff;
            margin-top: .5rem;
            &-left{
                width: 14.275rem;
                padding-right: 0.5rem;
                line-height: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                .l_title{
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 20px;
                }
                .l_subtitle{
                    font-size: 12px;
                    font-weight:400;
                }
            }
            &-right{
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 5.625rem;
                // justify-content: space-between;
                text-align: center;
                align-items: center;
                padding-left: .4rem;
                .r_btn{
                    width: 4.25rem;
                    padding: 0.33rem 0 0.26rem 0;
                    border: 1px solid  rgba(254,254,254,.8);
                    border-radius: 1.0625rem;
                    font-size: 0.75rem;
                }
                .r_btn2{
                    color: #FEFCF1;
                    border: 1px solid  rgba(254,252,241,.8);
                }
                .share_Btn{
                    margin-top: .6rem;
                }
            }
        }
        .couponbg{
            background: url('~./assets/images/propertyDetails/couponBg0.png') no-repeat center;
            background-size:  21.5625rem 5.375rem;
        }
        .discountBg{
            background: url('~./assets/images/propertyDetails/couponBg1.png') no-repeat center;
            background-size:  21.5625rem 5.375rem;
        }
        .reserve{
            padding: 0.75rem 0.75rem;
            display: flex;
            flex-direction: row;
            color: #674D34;
            margin-top: .5rem;
            border-radius: .3rem;
            &-left{
                width: 14.275rem;
                padding-right: 0.5rem;
                line-height: 1.6rem;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                flex-shrink: 0;
                word-break: break-all;
                .l_title{
                    font-size: 16px;
                    font-weight:bold;
                    line-height: 26px;
                }
                .l_subtitle{
                    font-size: 12px;
                    font-weight:400;
                    color: #876A4E;
                    line-height: 1rem;
                }
            }
            &-right{
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 5.625rem;
                // justify-content: space-between;
                text-align: center;
                align-items: center;
                padding-left: .4rem;
                .r_btn{
                    width: 4.25rem;
                    // height: 1.5625rem;
                    // line-height: 1.4rem;
                    padding: 0.33rem 0 0.28rem 0;
                    color: #8E6F52;
                    border: 1px solid  rgba(142,111,82,0.5);
                    border-radius: 1.0625rem;
                    font-size: 0.75rem;
                }
                .r_btn2{
                    color: #FEFCF1;
                    border: 1px solid  rgba(254,252,241,0.5);
                }
                .share_Btn{
                    margin-top: .6rem;
                }
            }
        }
        .reserveBg{
            background:linear-gradient(315deg,rgba(255,220,164,1) 0%,rgba(252,244,233,1) 100%);
        }

        .consultMore{
            height:2.25rem;
            line-height:2.25rem;
            background:rgba(245,245,245,1);
            border-radius:0.125rem;
            text-align: center;
            margin-top: 1rem;
            font-size: 0.875rem;
            font-weight: 400;
            color:#F95251;
            position: relative;
            #consultMore{
                position: absolute;
            }
        }
    }
}
</style>
