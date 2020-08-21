<template>
  <div class="model_groupSign iphoneBox">
    <activityHead :headText="headText" :styles="'background:#F5F5F5'"></activityHead>
    <template v-if="successTip">
      <div class="succFloat">
        <div class="succImg"><img src="./assets/images/propertyDetails/sc-img.png" /></div>
        <div class="succText">提交成功</div>
        <div class="succMsg">{{successMsg}}</div>
      </div>
    </template>
    <template v-else>
      <div class="groupMain">
        <div class="infoPanel">
          <p class="infoPanel-title">姓名</p>
          <p class="infoPanel-input"><van-field class="fl-input" v-model="contact_name" maxlength="11" placeholder="请输入真实姓名"/></p>
        </div>
        <div class="infoPanel">
          <p class="infoPanel-title">电话号码</p>
          <p class="infoPanel-input"><van-field class="fl-input" v-model="phone" maxlength="11" placeholder="请输入电话号码"/></p>
        </div>
        <div class="infoPanel">
          <p class="infoPanel-title">验证码</p>
          <div class="infoPanel-input">
            <van-field class="fl-input codeInput" v-model="code" maxlength="4" placeholder="请输入验证码" type="number" />
            <p class="codeBox">
              <span class="floatText codeText"  @click="handCode" v-show="isShowCodeText">获取验证码</span>
              <van-count-down class="codeText" v-show="isShowCodeText===false" ref="codeDown" :time="time" format="ss s" :auto-start="false" @finish="countDownEnd"/>
            </p>
          </div>
        </div>
        <div class="infoPanel">
          <p class="infoPanel-title">留言</p>
          <p class="infoPanel-input">
            <van-field
              class="fl-input"
              v-model="content"
              rows="4"
              autosize
              type="textarea"
              maxlength="225"
              placeholder="请输入留言"
              show-word-limit
            />
          </p>
        </div>
      </div>
      <div class="subBox" @click="handSublimt">
        提交
      </div>
    </template>
  </div>
</template>
<script>
import Vue from 'vue';
import activityHead from '@/components/activityHead/activityHead';

import commonServe from '@/services/common';
import propertyDetails from '@/services/api/propertyDetails';
import { verifPhone } from '@/utils/utils';

import { Toast } from 'vant';
Vue.use(Toast);
export default {
  components: {
    activityHead
  },
  data() {
    return {
      isShowCodeText: true,
      time: 60 * 1000, // 获取验证码倒计时初始值
      list: {},
      paramsConfig: {},
      headText: '看房团报名',
      contact_name: '',
      phone: '',
      code: '',
      content: '',
      successMsg: '',
      successTip: false
    };
  },
  mounted() {
  },
  methods: {
    handSublimt() {
      if (this.contact_name === '') {
        Toast('请输入您的姓名');
        return;
      }
      if (this.phone === '') {
        Toast('请输入您的手机号码');
        return;
      }
      if (!verifPhone(this.phone)) {
        Toast('请输入正确的手机号码');
        return;
      }
      if (this.code === '') {
        Toast('请输入验证码');
        return;
      }
      this.saveGroupenroll();
    },
    // 点击获取验证码
    handCode() {
      if (this.phone === '') {
        Toast('请输入手机号码');
        return;
      }
      if (!verifPhone(this.phone)) {
        Toast('请输入正确的手机号码');
        return;
      }
      this.getCodeInfo();
    },
    // 获取验证码信息
    async getCodeInfo() {
      const params = {
        phone: this.phone,
        type: '7'
      };
      const data = await commonServe.getCode(params);

      if (data.status === 1) {
        this.isShowCodeText = false; // 隐藏获取验证码文字显示倒计时
        this.$refs.codeDown.start(); // 开始倒计时
      } else {
        Toast(data.msg);
      }
    },
    // 倒计时结束
    countDownEnd() {
      this.isShowCodeText = true;
      // 重置倒计时
      this.$refs.codeDown.reset();
    },
    async saveGroupenroll() {
      const params = {
        access_token: this.$route.query.access_token,
        house_id: this.$route.query.house_id,
        contact_name: this.contact_name,
        phone: this.phone,
        code: this.code,
        content: this.content
      };
      const _data = await propertyDetails.groupenroll(params);

      if (_data.status === 1) {
        this.successMsg = _data.msg;
        this.successTip = true;
      } else {
        Toast(_data.msg);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.model_groupSign{
  padding-top: 4.5rem;
  top:0;
  left: 0;
  min-height: 100%;
  background: #F5F5F5;
  position: relative;
  .succFloat{
    position: absolute;
    top:4.5rem;
    left: 0;
    background: #FFFFFF;
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .succImg{
      width: 80px;
      height: 80px;
      position: relative;
      margin-top: 3rem;
      img{
        position: absolute;
        left: 50%;
        margin-left: -40px;
        top: 50%;
        margin-top: -40px;
      }
    }
    .succText{
      font-size:20px;
      font-weight:bold;
      color: #32323C;
      line-height: 4rem;
    }
    .succMsg{
      width:233px;
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color: #565656;
      line-height: 24px;
      letter-spacing: 0.02rem;
      text-align: center;
    }
  }
  .groupMain{
    padding: 1rem;
    background: #FFFFFF;
    .infoPanel{
      padding: 0.5rem 0;
      &-title{
        font-size: 16px;
        line-height: 34px;
        color: #32323C;
      }
      &-input{
        border-radius: 3px;
        overflow: hidden;
        position: relative;
        .fl-input{
          background: #F4F4F4;
        }
        .codeBox{
          position: absolute;
          z-index: 20;
          height: 100%;
          font-size: 14px;
          top:0;
          right: 0;
          width: 7rem;
          color: #F95251;
          text-align: center;
          .codeText{
            height: 100%;
            line-height: 2.9rem;
            color: #F95251;
          }
        }
      }
    }
  }
  .subBox{
    margin: 1rem;
    margin-top: 2rem;
    background: #F95251;
    color: #ffffff;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-radius: 5px;
  }

}
</style>
