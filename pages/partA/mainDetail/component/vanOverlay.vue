<template>
  <div class="vanOverlay">
    <van-overlay :show="isShowPop" @click.prevent>
        <div class="wrapper" @click.stop>
          <div class="closePop" @click="closeOverlay"></div>
          <!-- 预约看房 -->
          <div class="floatConent" v-if="enrollType =='appointment' || enrollType=='groupbuy'">
            <div class="closeBtn" @click="closeOverlay">
              <p class="closeImg"><img v-lazy="require('./assets/images/propertyDetails/close.png')" /></p>
            </div>
            <div class="msgReturn" v-if="successFloat === true">
              <div class="msgReturn-title">参加团购</div>
              <div class="mr-cent">
                <p>恭喜您！报名成功！为了便于日后沟通，将自动把您加入到团购群中。</p>
                <p>团购成功后太极功夫会尽全力跟开发商帮您争取最大幅度的优惠，如因特殊原因无法争取到本楼盘优惠时我们会为您推荐同类优惠楼盘，敬请期待</p>
                <p>人多力量大，快去喊上亲朋好友一起团购吧</p>
              </div>
              <div class="msgReturn-btnBox">
                <van-button class="retBtn" @click="handBridgeCallhandler({type:'cjtg',conversation_id:detailList.house_groupbuy.target_id})">去团购群看看</van-button>
                <van-button class="retBtn" @click="handBridgeCallhandler({type:'share',house_id:paramsConfig.house_id})">我要分享</van-button>
              </div>
              <div class="floatText msgReturn-desc">{{params.desc}}</div>
            </div>
            <div class="msgCent" v-if="successFloat === false">
              <div class="msgCent-title">{{ enrollType =='groupbuy' ? params.title ='参加团购' :'预约看房' }}</div>
              <div class="floatText msgCent-subTitle">{{params.subTitle}}</div>
              <div class="msgCent-box">
                <van-field class="fl-input" v-model="userName" maxlength="10" placeholder="请输入您的姓名"/>
              </div>
              <div class="msgCent-box">
                <van-field class="fl-input" v-model="vicPhone" maxlength="11" @blur="onBlur" placeholder="请输入您的手机号码"/>
              </div>
              <div class="msgCent-box msg-code">
                <van-field class="fl-input codeInput" v-model="code" maxlength="4" placeholder="请输入短信验证码" type="number" />
                <div class="codeBox">
                  <span class="floatText codeText" @click="handCode" v-show="isShowCodeText">获取验证码</span>
                  <van-count-down class="codeText" v-show="isShowCodeText===false" ref="codeDown" :time="time" format="ss s" :auto-start="false" @finish="countDownEnd"/>
                </div>
              </div>
              <div class="msgCent-btn">
                <van-button class="defineBtn" color="#F95251" @click="sublimt">
                  {{ enrollType =='policy' ? params.btnText ='确定':'确定' }}
                </van-button>
              </div>
              <div class="floatText msgCent-desc">{{params.desc}}</div>
            </div>
          </div>
          <!-- 领取优惠券 -->
          <div class="coupon" v-if="enrollType=='coupon' || enrollType=='discount'" :class="{'coupon2':isShareUser}">
            <div class="cpPanel" :class="{'cpSharePanel':isShareUser}">
              <div class="cpPanel-title" >{{params.title}}</div>
              <div class="cpPanel-condition">
                <p v-html="params.subTitle"></P>
                <!-- <p>使用条件：本人购房交易时用于抵用</P> -->
              </div>
              <div class="cpPanel-box cpPanelInput">
                <van-field class="fl-input" v-model="userName" maxlength="10" placeholder="请输入您的姓名"/>
              </div>
              <div class="cpPanel-box">
                <van-field class="fl-input" v-model="vicPhone" maxlength="11" @blur="onBlur" placeholder="请输入您的手机号码"/>
              </div>
              <div class="cpPanel-box msg-code">
                <van-field class="fl-input codeInput" v-model="code" maxlength="4" placeholder="请输入短信验证码" type="number" />
                <div class="codeBox">
                  <span class="floatText codeText" @click="handCode" v-show="isShowCodeText">获取验证码</span>
                  <van-count-down class="codeText" v-show="isShowCodeText===false" ref="codeDown" :time="time" format="ss s" :auto-start="false" @finish="countDownEnd"/>
                </div>
              </div>
              <!-- 立即领取按钮 -->
              <div class="cpPanel-btn">
                <p :class="{'discountBg' : enrollType=='discount'}" @click="sublimt"></p>
              </div>
              <div class="couponShareText" v-if="isShareUser">
                <span>来自</span>
                <p class="shareHead"><img v-lazy="avatar" /></p>
                <span class="shareName">{{nick_name}}</span>
                的分享
              </div>
              <div class="floatText cpPanel-desc" v-html="params.desc"></div>
            </div>
            <div class="closeBtn2">
              <p class="closeImg" @click="closeOverlay"></p>
            </div>
          </div>
        </div>
    </van-overlay>
  </div>
</template>
<script>
import Vue from 'vue';
// 接口
import commonServe from '@/services/common';
import { replacePhone, verifPhone } from '@/utils/utils';
import propertyDetails from '@/services/api/propertyDetails';

import { Toast, Dialog } from 'vant';
Vue.use(Toast).use(Dialog);

export default {
  name: 'vanOverlays',
  data() {
    return {
      isShowPop: this.isShowTip, // 是否显示层
      userName: '', // 姓名
      phone: '', // 存储的手机号码
      vicPhone: '', // 前端显示手机号
      phoneIsVerif: true, // 手机号码验证是否通过
      code: '', // 验证码
      isShowCodeText: true, // 是否显示获取验证码文字
      time: 60 * 1000, // 获取验证码倒计时初始值
      successFloat: false, // 成功后显示
      params: { // 弹框文字默认信息
        title: '预约看房',
        subTitle: '全天侯直播售楼处，置业顾问1对1服务',
        btnText: '确定',
        desc: '确定后新房置业顾问将与您电话联系提供免费咨询服务，通话全程隐藏您的真实号码',
      },
      isShareUser: false, // 是否点分享进来的用户
      paramsConfig: {},
      shareInfo: {},
      nick_name: '',
      avatar: ''
    };
  },
  props: {
    detailList: { // 后端返回详情数据
      type: Object,
      default: null
    },
    isShowTip: { // 是否显示层
      type: Boolean,
      default: false
    },
    enrollType: { // 选择的类型
      type: String
    }
  },
  mounted() {
    this.paramsConfig = this.storage.get('estate_config');
    this.shareInfo = this.storage.get('shareInfo');
    // 开发给APP关闭弹框
    window.H5CloseFlag = () => {
      this.closeOverlay();
    };
    if (window.history && window.history.pushState && this.Webkit.isWenxin()) {
      // // 往历史记录里面添加一条新的当前页面的url
      // window.history.State = null;
      // history.pushState(null, null, '');
      // 给 popstate 绑定一个方法 监听页面刷新
      window.addEventListener('popstate', this.closeOverlay, false); // false阻止默认事件
      this.$on('hook:beforeDestroy', () => {
        window.removeEventListener('popstate', this.closeOverlay);
      });
    }
    this.initFloatConent();
  },
  methods: {
    // 初始化弹框内容信息
    // 报名类型 coupon优惠券 discount折扣 appointment预约看房 groupbuy团购 policy金融支持政策
    initFloatConent() {
      if (this.shareInfo) {
        if (this.shareInfo.re_type === 'houseCoupon' || this.shareInfo.re_type === 'houseDiscount') {
          const _shareUserInfo = this.shareInfo.share_user;

          this.isShareUser = true;
          this.nick_name = _shareUserInfo.nick_name;
          this.avatar = _shareUserInfo.avatar;
        } else {
          this.isShareUser = false;

          this.setPhone();
        }
      } else {
        if (this.enrollType === 'groupbuy' && this.detailList.house_groupbuy.is_enroll === 1) {
          this.successFloat = true;
        }
        this.isShareUser = false;

        this.setPhone();
      }

      if (!this.enrollType) return;
      this.updateFloatConent(this.enrollType);
    },
    // 设置显示手机号码
    setPhone() {
      if (this.paramsConfig.phone) {
        this.vicPhone = this.paramsConfig.phone;
        this.phone = this.vicPhone;
        this.vicPhone = replacePhone(this.vicPhone);
      }
    },
    // 获取验证码信息
    async getCodeInfo() {
      if (!this.paramsConfig.access_token) {
        this.handBridgeCallhandler({ type: 'no_token' });
        return;
      }
      const params = {
        vaptcha_token: this.paramsConfig.access_token,
        phone: this.phone,
        type: '7'
      };
      const data = await commonServe.getCode(params);

      if (data.status === 1) {
        this.isShowCodeText = false; // 隐藏获取验证码文字显示倒计时
        this.$refs.codeDown.start(); // 开始倒计时
        console.log(data);
      } else {
        Toast(data.msg);
      }
    },
    onBlur() {
      if (this.vicPhone === replacePhone(this.phone)) {
        this.phoneIsVerif = false;
        return;
      };
      this.phoneIsVerif = true;
      if (!verifPhone(this.vicPhone)) {
        this.phoneIsVerif = false;
        Toast('请输入正确的手机号码');
        return;
      }
      this.phone = this.vicPhone;
    },
    // 点击获取验证码
    handCode() {
      if (this.vicPhone === '') {
        Toast('请输入手机号码');
        return;
      }
      if (!this.phoneIsVerif) {
        Toast('请输入正确的手机号码');
        return;
      }
      this.getCodeInfo();
    },
    // 倒计时结束
    countDownEnd() {
      this.isShowCodeText = true;
      // 重置倒计时
      this.$refs.codeDown.reset();
    },
    // 关闭弹框
    closeOverlay() {
      Dialog.close();
      // console.log(this.isShowPop)
      if (this.Webkit.isWenxin() && !this.isShowPop) {
        // eslint-disable-next-line no-undef
        WeixinJSBridge.call('closeWindow');
      }
      // if (this.Webkit.isApp() && !this.isShowPop) {
      //   this.handBridgeCallhandler({ type: 'closeFlag', isReturn: true });
      //   // eslint-disable-next-line no-undef
      //   // WeixinJSBridge.call('closeWindow');
      // } else {
      //   this.handBridgeCallhandler({ type: 'closeFlag', isReturn: false });
      // }
      if (this.Webkit.isApp()) this.handBridgeCallhandler({ type: 'closeFlag' });
      this.isShowPop = false;
      this.$emit('handClose', false);
    },
    updateFloatConent(enrollType) {
      const houseInfoArray = this.detailList['house_' + enrollType];

      this.reservation = true;
      if (enrollType === 'coupon') {
        this.params.title = houseInfoArray.title;
      } else if (enrollType === 'discount') {
        this.params.title = houseInfoArray.title;
      }

      this.params.subTitle = houseInfoArray.tip;
      this.params.desc = houseInfoArray.tip2;
    },
    // 提交
    sublimt() {
      if (!this.paramsConfig.access_token) {
        this.handBridgeCallhandler({ type: 'no_token' });
        return;
      }
      if (this.userName === '') {
        Toast('请输入您的姓名');
        return;
      }
      if (this.vicPhone === '') {
        Toast('请输入您的手机号码');
        return;
      }
      if (!this.phoneIsVerif) {
        Toast('请输入正确的手机号码');
        return;
      }
      if (this.code === '') {
        Toast('请输入验证码');
        return;
      }
      this.saveEnroll();
    },
    // 调原生方法
    handBridgeCallhandler(params) {
      this.$emit('childBridgeCallhandler', params);
    },
    // 用户报名接口提交
    async saveEnroll() {
      if (!this.paramsConfig.share_code) this.paramsConfig.share_code = '';
      const params = {
        access_token: this.paramsConfig.access_token,
        house_id: this.paramsConfig.house_id,
        enroll_type: this.enrollType,
        contact_name: this.userName,
        phone: this.phone,
        code: this.code,
        share_code: this.paramsConfig.share_code
      };
      const _data = await propertyDetails.houseEnroll(params);

      if (_data.status === 1) {
        if (this.enrollType === 'appointment') {
          this.closeOverlay();
          Toast('预约成功');
        } else if (this.enrollType === 'groupbuy') {
          this.successFloat = true;// 成功后显示团购
        } else if (this.enrollType === 'coupon' || this.enrollType === 'policy') {
          console.log(_data.data)
          // 跳转支付页
          const _parms = {
            type: 'pay_strategy',
            order_info: _data.data
          };

          this.handBridgeCallhandler(_parms);
          // this.closeOverlay();
          // Toast(_data.msg);
        } else if (this.enrollType === 'discount') {
          this.closeOverlay();
          Toast(_data.msg);
        } else {
          this.closeOverlay();
          Toast(_data.msg);
        }
        this.$emit('receivedSuccessfully');
      } else {
        Toast(_data.msg);
      }
    }
  },
  watch: {
    // isShowTip(value) {
    //   this.isShowPop = value;
    // }
  }
};
</script>
<style lang="less" scoped>
.vanOverlay{
  position: relative;
  z-index: 100;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .closePop{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 60;
    }
    .floatConent{
      width: 18.125rem;
      background-color: #fff;
      border-radius: 0.25rem;
      padding: 1rem;
      position: relative;
      z-index: 100;
      .closeBtn{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .closeImg{
          width: 0.75rem;
          height: 0.75rem;
        }
      }
      .msgCent,.msgReturn{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: .3rem;
        .floatText{
          color: #8F8F8F;
          font-size:0.8rem;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
        }
        .mr-cent{
          padding: 1.2rem 0;
          font-size:0.875rem;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:#32323C;
          text-align: left;
          line-height: 1.4rem;
          letter-spacing: 0.02;
          p:nth-child(1),p:nth-child(2){
            margin-bottom: 0.7rem;
          }
        }
        &-btnBox{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          .retBtn{
            width:7.5rem;
            height:2.3125rem;
            line-height:2.2rem;
            font-size:0.875rem;
            border: 1px solid #F95251;
            color: #F95251;
          }
        }
        &-title{
          font-size:18px;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color: #32323C;
          width: 100%;
          text-align: center;
        }
        &-subTitle{
          line-height: 1.1rem;
          padding: .5rem 0;
          width: 100%;
          text-align: center;
        }
        &-box{
          margin-top: .5rem;
          width: 100%;
          line-height: 1.5rem;
          background-color: #EFEFEF;
        }
        .fl-input{
          background-color: #EFEFEF;
          border-radius: .125rem;
          border-radius:6px;
        }
        .msg-code{
          width: 16.15rem;
          position: relative;
          .codeInput{
            width: 60%;
            padding-right: 0;
            display: inline-flex;
            height: 100%;
            line-height: 1.5rem;
            float: left;
            // line-height: 1.6rem;
          }
          .codeBox{
            display: inline-flex;
            /* justify-content: flex-end; */
            width: 8rem;
            height: 100%;
            line-height: 2.8rem;
            position: absolute;
            top: 0;
            left: 51%;
            text-align: center;
            // right: 0;
            justify-content: center;
            color: #C7000C;
            .codeText{
              position:absolute;
              top:0;
              width: 100%;
              color: #C7000C;
              line-height: 2.8rem;
              text-align: center;
            }
          }
        }
        &-btn{
          margin-top: 1rem;
          width: 100%;
          .defineBtn{
            width: 100%;
            font-size:1rem;
            letter-spacing: 0.1rem;
          }
        }
        &-desc{
          padding: 1rem 0;
          font-size:0.75rem!important;
          font-weight:400!important;
          line-height: 1rem;
          letter-spacing: 0.07rem;
          text-align: left;
        }
      }
    }
    .coupon{
      width: 20rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 34.5rem;
      position: relative;
      z-index: 100;
      .cpPanel{
        padding: 0.2rem 2.5rem 1.5rem 2.5rem;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // align-items: center;
        text-align: center;
        margin-top: .3rem;
        background: url('./assets/images/propertyDetails/cupBg.png') no-repeat center;
        background-size: 18.75rem 505px;
        position: relative;
        .floatText{
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:#FFFFFF;
        }
        &-title{
          font-size:1.25rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:#D63232;
          line-height: 1.4rem;
          margin-top: 1.3rem;
          height: 44px;
        }
        &-condition{
          font-size:0.875rem;
          letter-spacing: 0ch;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:#D63232;
          line-height: 1.1rem;
          margin-top: 0.6rem;
          height: 6rem;
          display: flex;
          text-align: left;
          // padding: 1.5rem 0;
        }
        &-box{
          margin-top: .5rem;
          width: 100%;
          line-height: 1.5rem;
          background-color: #fff;
          border-radius: 6px;
          overflow: hidden;
        }
        .fl-input{
          background-color: #FFF8F2;
          border-radius:6px;
          overflow: hidden;
        }
        .msg-code{
          width: 15rem;
          position: relative;
          .codeInput{
            width: 60%;
            padding-right: 0;
            display: inline-flex;
            height: 100%;
            line-height: 1.5rem;
            float: left;
            // line-height: 1.6rem;
          }
          .codeBox{
            display: inline-flex;
            /* justify-content: flex-end; */
            width: 8rem;
            height: 100%;
            line-height: 2.8rem;
            position: absolute;
            top: 0;
            left: 47%;
            // right: 0;
            justify-content: center;
            text-align: center;
            color: #C7000C;
            font-size: 12px;
            background-color: #FFF8F2;
            .codeText{
              position:absolute;
              top:0;
              width: 100%;
              color: #C7000C;
              line-height: 2.8rem;
              text-align: center;
            }
          }
        }
        &-btn{
          margin: 1rem 0 0.8rem 0;
          width: 100%;
          height: 40px;
          p{
            height: 40px;
            background: url('./assets/images/propertyDetails/pullBtn.png') no-repeat center;
            background-size: 100% 40px;
          }
          .discountBg{
            height: 40px;
            background: url('./assets/images/propertyDetails/pullBtn2.png') no-repeat center;
            background-size: 100% 40px;
          }
        }
        .couponShareText{
          display: flex;
          flex-direction: row;
          font-size:0.875rem;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:#FFFFFF;
          height: 2.5rem;
          line-height: 2.5rem;
          align-items: center;
          justify-content: center;
          .shareHead{
            width: 1.8rem;
            height: 1.8rem;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 .25rem;
          }
          .shareName{
            display: inline-block;
            max-width: 6.25rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        &-desc{
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:#FFFFFF;
          line-height: 1.05rem;
          text-align: left;
        }
        .cpPanelInput{
          margin-top: 1.3rem;
        }
      }
      .cpSharePanel{
        background: url('./assets/images/propertyDetails/cupBg2.png') no-repeat center;
        background-size: 18.75rem 33.4375rem;
      }
      .closeBtn2{
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: .5rem;
        .closeImg{
          width: 2.125rem;
          height: 2.125rem;
          background: url('./assets/images/propertyDetails/ic_cha.png') no-repeat center;
          background-size: 2.125rem 2.125rem;
        }
      }
    }
    .coupon2{
      height: 37rem;
    }
    .van-overlay{
      z-index: 200;
    }
  }
}
</style>
