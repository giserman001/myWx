<template>
  <div class="moudel_propertyDetails ua-box" ref="detais">
    <!-- 顶部 -->
    <div class="detailTitle">
       <div class="t_icon" v-if="!isShowHouseName">
         <div class="iconCir" v-if="Webkit.isDebug() || Webkit.isApp()" @click="bridgeCallhandler({type:'back'})">
           <img v-lazy="require('@/assets/images/propertyDetails/left_icon0.png')" alt />
         </div>
        <div class="videoImg" v-if="topVideoShow&&isSilde" @click="closeVideo"></div>
        <div class="iconImg" v-if="Webkit.isDebug() || Webkit.isApp()" @click="handRightList">
          <img v-lazy="require('@/assets/images/propertyDetails/right_icon0.png')" alt />
        </div>
      </div>
      <div class="t_icon" v-else>
        <span class="iconCir" v-if="Webkit.isDebug() || Webkit.isApp()" @click="bridgeCallhandler({type:'back'})">
           <img class="left-icon" v-lazy="require('@/assets/images/propertyDetails/left_icon.png')" alt />
          <!-- <van-icon class="iconCir-img" name="arrow-left" /> -->
        </span>
        <div class="iconImg" v-if="Webkit.isDebug() || Webkit.isApp()" @click="handRightList">
          <img class="right-icon" src="@/assets/images/propertyDetails/right_icon.png" alt />
        </div>
      </div>
      <div class="t_text" v-if="isShowHouseName&&Webkit.isApp() || isShowHouseName&&Webkit.isDebug()" :style="opacityStyle">
        <span>{{detailList.house_name}}</span>
      </div>
    </div>
    <!-- 右侧操作按钮列表 -->
    <div class="rightList" v-if="isShowRightList">
      <div class="listBg" @click="displRightList" @touchstart="stop"  @touchend="move"></div>
      <div class="rl-ul">
        <div class="rl-triangle"></div>
        <div class="rl-li" @click="bridgeCallhandler({type:'share',house_id:paramsConfig.house_id})">
          <p class="rl-icon">
            <img src="@/assets/images/propertyDetails/share_icon.png" />
          </p>
          <span>分享</span>
        </div>
      </div>
    </div>

    <!-- 头部轮播 -->
    <div class="detailPanel" v-if="detailList.house_pic&&detailList.house_pic!=''">
      <van-swipe
        class="my-swipe"
        :loop="false"
        :show-indicators="false"
        indicator-color="white"
        @change="topOnChange"
        :stop-propagation="false"
      >
        <van-swipe-item v-if="topVideoShow">
          <div class="c_video">
            <myVideo
              :toPlay="toPlay"
              :currentTime="currentTime"
              :videoUrl="detailList.house_video.url"
              :videoImg="detailList.house_video.cover"
              @isPlays="isPlays"
              @handBridgeCallhandler="bridgeCallhandler"
              @TouchDown="isTouchDown"
              @exitPortrait="exitPortrait"
            >
            </myVideo>
          </div>
        </van-swipe-item>
        <template v-if="!isTouch">
          <van-swipe-item v-for="(item,index) in detailList.house_pic" :key="index">
            <img @click="previewImg" class v-lazy="item" />
          </van-swipe-item>
        </template>
        <template #indicator>
          <div class="custom-indicator" :style="topVideoShow&&isSilde?'opacity:0':'opacity:1'">
            <span
              v-if="detailList.house_pic&&!topVideoShow ||detailList.house_pic&&isSilde == false"
            >{{ topVideoShow?current:current + 1 }}/{{detailList.house_pic.length}}</span>
          </div>
        </template>
      </van-swipe>
      <div class="videoBtn" @click="playVideo" v-if="detailList.house_video&&!topVideoShow&&detailList.house_video.url">
        <div class="viconBox"></div>
        <div class="videoTime">{{ videoTimeformatDuring(detailList.house_video.duration) }}</div>
      </div>
    </div>

    <!-- 标题信息 -->
    <div class="detailInfo" v-if="detailList.house_name">
      <!-- 标题地区价格 -->
      <div class="detInfo">
        <div class="detInfo-name">{{detailList.house_name}}</div>
        <div class="detInfo-addr">{{detailList.location_addr}}</div>
        <div class="detInfo-price">
          <p class="cate-unit">
            <span v-if="detailList.price_unit&&detailList.price_unit!=''&& userInfo.userRole > 0" class="detInfo-discount">{{detailList.price_unit}}</span>
            <span class="ct_unit">{{detailList.cate_unit}}</span>
            <span class="house_price">{{detailList.price_text}}</span>
          </p>
          <p class="total-unit" v-if="detailList.total_price">
            <span class="tt_unit">{{detailList.total_unit}}</span>
            <span class="house_price">{{detailList.total_price}}</span>
          </p>
          <!-- <span class="house_price">{{detailList.house_price}}元</span><span>/{{detailList.house_unit}}</span> -->
        </div>
        <div class="detInfo-promote" v-if="userInfo.userRole > 1 && detailList.distribute_amount > 0">
          <span>推广赚¥{{detailList.distribute_amount}}</span>
        </div>

        <!-- <div class="detInfo-memberLab" @click="bridgeCallhandler({type:'sjzchy'})" v-if="userInfo.userRole == 0 && userInfo.childUserRole == 0">
          <span>升级注册会员，享受全网会员价</span>
          <p class="arr_icon"></p>
        </div>
        <div class="detInfo-memberLab" @click="bridgeCallhandler({type:'sjzchy'})" v-if="userInfo.userRole == 1 && userInfo.childUserRole == 0">
          <span>升级超级会员，推广赚钱，享受更多权益</span>
          <p class="arr_icon"></p>
        </div> -->
        <div class="detInfo-memberLab" v-if="userInfo.userRole < 3 && userInfo.childUserRole == 0&&detailList.user_upgrade.title" @click="bridgeCallhandler({type:'sjzchy'})">
          <div class="detInfoTitle">
            <p>{{detailList.user_upgrade.title}}</P>
            <p>{{detailList.user_upgrade.subtitle}}</p>
          </div>

          <p class="arr_icon">一键升级</p>
        </div>
      </div>
    </div>

    <!-- 住金所 -->
    <domicile v-if="detailList.house_zhujinsuo&&detailList.house_zhujinsuo.content!=''" :detailInfo="detailList"></domicile>

    <!-- 直播看房 -->
    <template v-if="detailList.house_live && detailList.house_live.live_pic">
      <div class="promotBox liveViewing">
        <div class="liveLeft">
          <img :src="detailList.house_live.live_pic" />
        </div>
        <div class="liveRight">
          <p class="live_text">{{detailList.house_live.live_text}}</p>
          <div class="live_btn" v-if="detailList.house_live.re_live_id > 0"
                                @click="bridgeCallhandler({type:'zbkf', re_live_id:detailList.house_live.re_live_id,
                                                                        house_id:detailList.id})">
            <p class="live_playIcon"><img src="@/assets/images/propertyDetails/live_icon.png" /></p>
            <span>{{detailList.house_live.live_status}}</span>
          </div>
          <!-- 直播回看 -->
          <div class="live_btn" v-else @click="bridgeCallhandler({type:'zbhf', targetId:detailList.seller_data.id,
                                                                        targetName:detailList.seller_data.nick_name,
                                                                        house_id:detailList.id,
                                                                        url:detailList.house_pic[0],
                                                                        house_name:detailList.house_name})">
            <p class="live_playIcon"><img src="@/assets/images/propertyDetails/live_icon.png" /></p>
            <span>{{detailList.house_live.live_status}}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- 房子参数 -->
    <div class="houseParams" v-if="detailList.house_tpl">
      <div class="houseParams-rows houseParams-select">
      <!-- <div class="houseParams-rows houseParams-select" :class="{'houseParams-select':isShowCollapse}"> -->
        <div v-for="(item,index) in detailList.house_tpl" :key="index">
          <div class="houseParams-rows-td" v-if="index < houseTplLength">
              <p class="t-name">{{item.name}}：</p>
              <p class="t-value">{{item.value}}</p>
          </div>
        </div>
      </div>
      <div
        class="houseControl"
        v-if="detailList.house_tpl && detailList.house_tpl.length > 4"
        @click="handHouseControl"
      >{{houseControlText}}</div>
    </div>

    <!-- 加入店铺 -->
    <addShop v-if="userInfo.userRole > 1 && detailList.in_store === 0" :detailInfo="detailList" @successFully="getHouseDetail"></addShop>

    <!-- 拨打电话 -->
    <div class="iphonePanel" v-if="detailList.house_consult">
      <div class="iphonePanel-left">
        <p class="l_phone">{{detailList.house_consult.title}}</p>
        <p class="l_text">{{detailList.house_consult.subtitle}}</p>
      </div>
      <div
        class="iphonePanel-right"
        @click="bridgeCallhandler({type:'callphone',phone:detailList.house_consult.tel})"
      >
        <p class="r_img">
          <img v-lazy="require('@/assets/images/propertyDetails/iphone_icon.png')" />
        </p>
      </div>
    </div>

    <!-- 看房团 -->
    <childGroup
      v-if="detailList.house_group && detailList.house_group!='' && detailList.house_group.status!=2"
      :detailInfo="detailList"
      @handBridgeCallhandler="bridgeCallhandler"
      ></childGroup>

    <!-- 优惠活动 -->
    <promotions
      v-if="detailList.house_coupon"
      :house_id="paramsConfig.house_id"
      :detailInfo="detailList"
      @successFully="initList"
      @gotoPolicy="gotoPolicy"
      @handBridgeCallhandler="bridgeCallhandler"
    ></promotions>

    <!-- 房产编号 -->
    <div class="houseCode" v-if="detailList.house_code && detailList.house_code!=''">商品编号：{{detailList.house_code}}</div>

    <!-- 房产介绍 -->
    <propertyDesc
      v-if="detailList.house_desc&&detailList.house_desc!=''&&isStartMove"
      :isStartMove="isStartMove"
      :isLoadMove="isLoadMove"
      :detailInfo="detailList"
      @moveEnd="isMoveEnd"
      @bridgeCallhandler="bridgeCallhandler"
      @successFully="initList"
    ></propertyDesc>

    <!-- 底部模块 -->
    <bottonModel v-if="detailList.house_consult" :detailInfo="detailList" :userRole="userInfo.userRole" @bridgeCallhandler="bridgeCallhandler"></bottonModel>

    <!-- 点击显示大图轮播 -->
    <van-image-preview
      v-model="isImgDisplay"
      :start-position="this.current"
      :images="house_images"
      @change="onChange"
    >
      <template v-slot:index>{{ (index+1) }}/{{house_images.length}}</template>
    </van-image-preview>

    <!-- 提问按钮 -->
    <div class="quizBtn">
      <!-- <div v-if="isShowQuiz" class="quizBtnFloat" @click="isShowQuiz=false"></div> -->
      <van-overlay :show="isShowQuiz" @click="isShowQuiz=false">
        <div class="quiz" :class="[!isTop&&!isAllDown ? 'quizOne': isTop && isAllDown ? 'quizTwo':'']" @click.stop v-if="detailList.house_questions&&isShowQuiz">
          <div class="quiz-li"  @click="bridgeCallhandler({type:'question',seller_id:detailList.seller_id,question:item.question})" v-for="(item,index) in detailList.house_questions" :key="index">
            <p>{{item.question}}</p>
            <p class="quiz-icon"></p>
          </div>
        </div>
      </van-overlay>
      <div class="flexBtn">
        <div class="quizImg" @click="handQuiz" v-if="detailList.house_questions!='' && detailList.seller_id !== userInfo.id">
          <p class="quizText">提问</p>
          <p class="quizicon" :class="{'tqicon' : isShowQuiz }"></p>
        </div>
        <div class="rt-top animate__animated animate__fadeInRight" v-if="isTop">
          <div class="rt-top-bg" v-if="isShowQuiz"></div>
          <div class="rt-top-cent" @click="returnTop">
            <p class="r_top"></p>
            <p class="r_text">顶部</p>
          </div>
        </div>
        <div class="rt-allDown animate__animated animate__fadeInRight" v-if="detailList.house_desc!=''&&isAllDown && userInfo.userRole > 0">
          <div class="rt-top-bg" v-if="isShowQuiz"></div>
          <p @click="bridgeCallhandler({type:'allDownload',url:allDown()})">发小<br/>视频</p>
        </div>
      </div>
    </div>

    <!-- 竖屏视频播放 -->
    <template v-if="detailList.house_video&&detailList.house_video.url">
      <div class="horizontalVideoBox" v-show="isShowHorizVideo">
        <adaptiveVideo
          :toPlay="toPlay2"
          :currentTime="currentTime"
          :videoWid="detailList.house_video.width"
          :videoHeg="detailList.house_video.height"
          :videoUrl="detailList.house_video.url"
          :videoImg="detailList.house_video.cover"
          @isPlays="isAdaptPlays"
          @childBridgeCallhandler="bridgeCallhandler"
          @exitHorizontal="exitHorizontal"></adaptiveVideo>
      </div>
    </template>

    <myfooter :openData="openData"></myfooter>
    <jump @clickJumpPage="clickJumpPage" v-show="displayJumpPage"></jump>
  </div>
</template>

<script>
import Vue from 'vue';
import animated from 'animate.css';

// 单页面组件
import promotions from './promotions.vue';
import propertyDesc from './propertyDesc.vue';
import bottonModel from './bottonModel';
import myfooter from '@/components/footer/footer';
import myVideo from '@/components/video/video';
import adaptiveVideo from '@/components/adaptiveVideo/adaptiveVideo';
import addShop from '@/components/addShop/addShop';
import domicile from '@/components/domicile/domicile';
import Jump from '@/components/jump/jump';
import childGroup from './component/group';

import 'videojs-contrib-hls';

// 接口
import propertyDetails from '@/services/api/propertyDetails';
import { formatDuring } from '@/utils/utils';
import { Webkit, openApp } from '@/utils/tools/tools.js';

import { Swipe, SwipeItem, Icon, Toast, Lazyload, Field, CountDown, ImagePreview } from 'vant';

Vue.use(Toast).use(Icon).use(Swipe).use(SwipeItem);
Vue.use(Lazyload, { lazyComponent: true }).use(Field).use(CountDown);
Vue.use(animated).use(Toast).use(ImagePreview);

export default {
  name: 'propertyDetails',
  data() {
    return {
      paramsConfig: {
        userRole: -1
      }, // 获取到链接上传过来的参数
      isShowRightList: false,
      displayJumpPage: false, // 显示提示页面
      scrollTop: 0, // 滚动条距离
      current: 0, // 顶部页码
      topVideoShow: false, // 顶部视频
      isShowHouseName: false, // 是否显示头部标题
      opacityStyle: {
        opacity: 0
      },
      houseTplLength: 4, // 默认显示条数
      isShowCollapse: false, // 是否展示收起
      houseControlText: '展开',
      isSilde: false,
      detailList: {}, // 详情列表数据
      userInfo: {}, // 用户信息
      isStartMove: false, // 是否开始动画
      isMoveEnd: false, // 动画是否执行完成
      isImgDisplay: false, //  点击查看大图
      index: 0, // 图片下标
      house_images: [],
      isShowQuiz: false, // 是否显示提问
      shareUrl: window.location.href,
      setTime: null,
      openData: {}, // 打开app需要传递的数据
      toBegin: false, // 重置进度条
      toPause: false, // 去暂停视频
      toPlay: false,
      toPlay2: false,
      videoUrl: '',
      Hls: window.Hls,
      isAllDown: false, // 是否显示一键下载
      isTop: false, // 是否显示返回顶部
      isShowHorizVideo: false,
      currentTime: 0,
      exitSetTime: null,
      isTouch: false,
      moveTop: 530,
      isLoadMove: false
    };
  },
  created() {
    // 监听APP调H5事件
    this.bridgeRegisterhandler();
    // window.H5Callback = (data) => {
    //   this.mobileH5Callback(data);
    // };
  },
  mounted() {
    // console.log(Webkit.isApp());
    window.addEventListener('scroll', this.handScroll, true);
    this.$on('hook:beforeDestroy', () => {
      this.storage.remove('isHorz');
      window.removeEventListener('scroll', this.handScroll);
    });

    // 拿到链接上获取到存储的配置
    const paramsConfig = this.storage.get('estate_config');

    this.paramsConfig = {};
    if (paramsConfig) {
      this.paramsConfig = paramsConfig;
      // 传给APP的参数
      this.openData = {
        house_id: this.paramsConfig.house_id,
        type: 8,
        share_code: this.paramsConfig.share_code
      };
      this.initList();
    }
  },
  methods: {
    displRightList() {
      this.isShowRightList = false;
    },
    stop() {
      const mo = function(e) {
        e.preventDefault();
      };

      document.body.style.overflow = 'hidden';

      // document.addEventListener('touchmove', mo, true); // 禁止页面滑动
      window.removeEventListener('scroll', this.handScroll);
    },
    // 取消滑动限制
    move() {
      setTimeout(() => {
        const mo = function(e) { e.preventDefault(); };

        document.body.style.overflow = ''; // 出现滚动条
        window.addEventListener('scroll', this.handScroll, true);
        // document.removeEventListener('touchmove', mo, false);
      }, 50);
    },
    // 全屏是否暂停
    isAdaptPlays(value) {
      this.toPlay2 = value;
    },
    // 小屏是否暂停
    isPlays(value) {
      this.toPlay = value;
    },
    // 判断个数以及滑动距离
    sildeMoveTop() {
      const domCount = document.getElementsByClassName('promotBox').length;

      if (domCount < 2) {
        this.moveTop = 160;
      } else if (domCount < 4 && domCount >= 2) {
        this.moveTop = 320;
      } else if (domCount < 5 && domCount > 3) {
        this.moveTop = 430;
      } else {
        this.moveTop = 530;
      }
    },
    // 点击进入全屏
    exitPortrait(currentTime) {
      this.currentTime = currentTime;
      this.isShowHorizVideo = true;
      this.storage.set('isHorz', true);
      if (this.Webkit.isApp()) this.bridgeCallhandler({ type: 'openFlag', maxFlag: true });
      this.toPlay = false;
      this.toPlay2 = true;
      // clearTimeout(this.exitSetTime);
      // this.exitSetTime = setTimeout(() => {
      // }, 200);
    },
    // 退出全屏
    exitHorizontal(currentTime) {
      this.currentTime = currentTime;
      this.toPlay = this.toPlay2;
      this.toPlay2 = false;
      this.storage.set('isHorz', false);
      this.isShowHorizVideo = false;
      if (this.Webkit.isApp()) this.bridgeCallhandler({ type: 'closeFlag', maxFlag: false });
      clearTimeout(this.exitSetTime);
      // this.exitSetTime = setTimeout(() => {
      // }, 300);
    },
    isTouchDown(value) {
      this.isTouch = value;
    },
    allDown() {
      let houseDesc = [];

      this.detailList.house_desc.forEach((item, index) => {
        let houseChild = {};

        // if (item.type === 'video' || item.type === 'image') {
        if (item.type === 'image') {
          houseChild.resourceType = item.type;
          houseChild.resourceUrl = item.download;
          houseDesc.push(houseChild);
        }
      });
      return JSON.stringify(houseDesc);
    },
    // 返回顶部
    returnTop() {
      window.scrollTo(0, 0);
    },
    // app调H5方法 window下
    mobileH5Callback(data) {
      // alert(data)
      let _data = JSON.stringify(data);
      // alert(_data)
      // data = JSON.parse(_data);
      // alert(data.flag)
      if (parseInt(_data) === 0) {
        this.gotoPolicy();
        this.initList();
        // this.gotoPolicy();
      } else {
        Toast('支付失败');
      }
    },
    // 点击分享
    handShare() {
      if (Webkit.isWenxin()) {
        window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.ms.tjgf';
      } else {
        openApp(this.openData);
      }
    },
    // question() {
    //   this.bridgeCallhandler({type:'question',target_id:detailList.seller_id,question:item})
    // },
    // 点击右侧展示右侧列表
    handRightList() {
      if (!this.isShowRightList) this.isShowRightList = true;
      else this.isShowRightList = false;
    },
    // 初始化数据
    initList() {
      // 获取用户信息
      if (this.paramsConfig.access_token) this.getUserInfo();
      else this.storage.remove('userInfo');
      // 获取分享信息
      if (this.paramsConfig.share_code) this.getSharelink();
      else this.storage.remove('shareInfo');
      // 获取详情数据
      this.getHouseDetail();

      this.sildeMoveTop();
    },
    // 获取用户信息
    async getUserInfo() {
      const _params = {
        access_token: this.paramsConfig.access_token
      };
      const data = await propertyDetails.getMyHome(_params);

      if (data.status === 1) {
        this.userInfo = data.data;

        const _role = this.getUserRole(this.userInfo.user_role);

        // 用户手机号
        this.paramsConfig.phone = this.userInfo.phone;
        // 0:normal普通会员 1:register注册会员 2:super超级会员 3:supremacy至尊/初级合伙人 4:partner合伙人
        // user_pid 0注册会员  >0超级会员
        this.userInfo.userRole = _role;
        this.userInfo.childUserRole = this.userInfo.user_pid;
        this.storage.set('userInfo', this.userInfo);
        this.storage.set('estate_config', this.paramsConfig);
        // this.getUserRole();
      } else if (data.status === -1) {
        console.log(this.Webkit.isApp())
        if (this.Webkit.isApp()) {
          this.bridgeCallhandler({ type: 'no_token' });
        }
      } else {
        this.storage.remove('userInfo');
      }
      // if (this.Webkit.isDebug()) this.userInfo.userRole = 2;
    },
    // 获取分享信息
    async getSharelink() {
      const params = {
        share_code: this.paramsConfig.share_code
      };
      const data = await propertyDetails.getShareLink(params);

      if (data.status === 1) {
        this.storage.set('shareInfo', data.data);
        // this.isShareUser = true;
        // this.nick_name = data.data.share_user.nick_name;
        // this.avatar = data.data.share_user.avatar;
      }
    },
    // 获取详情信息
    async getHouseDetail() {
      if (!this.paramsConfig.share_code) this.paramsConfig.share_code = '';
      const _params = {
        house_id: this.paramsConfig.house_id,
        access_token: this.paramsConfig.access_token,
        share_code: this.paramsConfig.share_code
      };
      const data = await propertyDetails.getHouseDetail(_params);

      if (data.status === 1) {
        this.detailList = data.data;
        document.title = this.detailList.house_name;
      } else {
        Toast(data.msg);
      }
    },
    // 导入店铺
    async addShop() {
      const _params = {
        access_token: this.paramsConfig.access_token,
        re_id: this.paramsConfig.house_id,
        re_type: 'house'
      };
      const data = await propertyDetails.storeSharePmport(_params);

      if (data.status === 1) {
        this.getHouseDetail();
        Toast('导入店铺成功');
      } else {
        Toast(data.msg);
      }
    },
    // 获取会员等级
    getUserRole(userRole) {
      const _role = userRole === 'register' ? 1 : userRole === 'super' ? 2 : userRole === 'supremacy' ? 3 : userRole === 'partner' ? 4 : 0;

      return _role;
    },
    // 视频时间转换
    videoTimeformatDuring(time) {
      return formatDuring(time);
    },
    // 调原生方法
    bridgeCallhandler(params) {
      // console.log(params)
      if (Webkit.isWenxin()) {
        this.clickInWeixin();
        // window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.ms.tjgf';
      } else if (!Webkit.isApp()) {
        if (Webkit.isDebug()) return;
        openApp(this.openData);
      }

      // 提问的话特殊处理参数
      if (params.type === 'question') {
        params = this.assignCardInfoParams(params);
      }
      // eslint-disable-next-line consistent-this
      // const _self = this;
      // if (params.type === 'pay_strategy') {
      //   this.bridgeRegisterhandler();
      // }

      this.bridge.callhandler('AppCallback', params, data => {
        // alert('测试');
        // const _data = JSON.parse(data);

        // alert(JSON.stringify(_data));
        // if (_data.flag === 0) {
        //   _self.gotoPolicy();
        // }
        // 处理返回数据
      });
    },
    bridgeRegisterhandler() {
      this.bridge.registerhandler('H5Callback', (data) => {
        let _data = decodeURIComponent(data);

        _data = JSON.parse(_data);
        if (_data.flag === 0) {
          this.gotoPolicy();
        }
      });
    },
    gotoPolicy() {
      this.bridgeCallhandler({ type: 'zygw', seller_id: this.detailList.house_policy.target_id });
      // if (!this.paramsConfig.share_code) this.paramsConfig.share_code = '';
      // this.$router.push({
      //   name: 'policy',
      //   query: {
      //     house_id: this.paramsConfig.house_id,
      //     access_token: this.paramsConfig.access_token,
      //     share_code: this.paramsConfig.share_code
      //   }
      // });
    },
    // 拼接房产参数
    assignCardInfoParams(params) {
      const _detailList = this.detailList;

      const _cardInfo = {
        cardInfo: {
          title: _detailList.house_name,
          address: _detailList.location_addr,
          priceName: _detailList.cate_unit,
          price: _detailList.price_text,
          house_id: _detailList.id,
          house_cover: _detailList.house_pic[0]
        }
      };

      const _params = Object.assign(params, _cardInfo);

      return _params;
    },
    // 关闭视频层
    closeVideo() {
      this.topVideoShow = false;
      this.videoPause();
    },
    videoPlay() {
      setTimeout(() => {
        this.toPlay = true;
      }, 100);
    },
    videoPause() {
      this.toPlay = false;
    },
    // 播放视频
    playVideo() {
      this.topVideoShow = true;
      this.isSilde = true;
      this.videoPlay();
      // this.toBegin = true;
      // console.log(this.$refs.videoPlayer)
      // this.onPlayerPlay();
    },
    // 顶部图片轮播
    topOnChange(index) {
      this.current = index;
      if (this.topVideoShow) {
        if (index === 0) {
          this.isSilde = true;
          this.videoPlay();
        } else {
          this.isSilde = false;
          this.videoPause();
        }
      }
    },
    // 点击显示大图浮层
    previewImg() {
      this.isImgDisplay = true;
      this.house_images = this.detailList.house_pic;
    },
    // 点击查看大图轮播
    onChange(index) {
      this.index = index;
    },
    // 控制展开收起
    handHouseControl() {
      if (!this.isShowCollapse) {
        this.isShowCollapse = true;
        this.houseTplLength = this.detailList.house_tpl.length;
        // detailList.house_tpl.length
        this.houseControlText = '收起';
      } else {
        this.isShowCollapse = false;
        this.houseTplLength = 4;
        this.houseControlText = '展开';
      }
    },
    moveEnd(value) {
      this.isMoveEnd = value;
    },
    // 滚动条监听
    handScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      // 高度大于100的时候开始显示头部
      if (this.scrollTop > 260) {
        let opacity = this.scrollTop / 340;

        opacity = opacity > 1 ? 1 : opacity;
        this.opacityStyle = { opacity };
        this.isShowHouseName = true;
        this.isTop = true;
      } else {
        this.isShowHouseName = false;
        this.isTop = false;
      }
      // const _height = document.body.scrollHeight - this.scrollTop;

      if (Webkit.isDebug()) this.scrollTop = this.scrollTop - 100;
      // console.log(this.scrollTop, _height);
      // if (this.scrollTop >= _height) {
      if (this.scrollTop >= this.moveTop) {
        this.isStartMove = true;
        this.$nextTick(() => {
          this.isLoadMove = true;
        });
        this.isAllDown = true;
      } else {
        this.isAllDown = false;
        this.isLoadMove = false;
      }
      // console.log(this.scrollTop)
    },
    handQuiz() {
      if (!this.isShowQuiz) {
        this.isShowQuiz = true;
      } else {
        this.isShowQuiz = false;
      }
    },
    clickJumpPage() {
      this.displayJumpPage = false;
    },
    clickInWeixin() {
      this.displayJumpPage = true;
    }
  },
  components: {
    promotions,
    propertyDesc,
    bottonModel,
    myVideo,
    domicile,
    // horizontalVideo,
    adaptiveVideo,
    myfooter,
    addShop,
    Jump,
    childGroup
  },
  destroyed() {
    this.topVideoShow = false;
    this.isShowHorizVideo = false;
    this.toPlay = false;
    this.toPlay2 = false;
    if (this.topVideoShow) {
      this.videoPause();
      this.toPlay = false;
      this.toPlay2 = false;
    }
    if (this.isShowHorizVideo) {
      this.toPlay = false;
      this.toPlay2 = false;
    }
  }
};
</script>
<style lang="less" scoped>
@import './css/propertyDetails.less';

/deep/ .video-js {
  height: 100%;
}
/deep/ .van-swipe-item{
  position: relative;
  display: flex;
  align-items: center;
}
/deep/ .van-swipe__track {
  scroll-behavior: smooth;
}
/deep/ .van-image-preview__index{
  padding-top:20px;
}
</style>
