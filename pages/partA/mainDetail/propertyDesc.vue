<template>
  <div class="propertyDescPanel" ref="earth">
    <div class="desc_list animate__animated animate__fadeInUp" ref="text" :class="'animate__delay-' + index + 's'" v-for="(item,index) in detailInfo.house_desc" :key="index">
      <div class="desc_head">
        <img :src="detailInfo.seller_data.avatar" />
        <!-- <img v-lazy="require('./assets/images/propertyDetails/head_icon.png')" /> -->
      </div>
      <div class="desc_cent">
        <!-- 视频 -->
        <div class="c_video"  @click="handVideo(item,index)" v-if="item.type === 'video'">
          <div class="playBox"  @click="playVideo(item,index)" v-show="!topVideoShow[index]">
            <div class="playImg"></div>
            <img :src="item.cover" />
          </div>
          <!-- <myVideo v-show="topVideoShow[index]"
              :toPlay="toPlay[index]"
              :currentTime="currentTime"
              :videoUrl="item.content"
              :videoImg="item.cover"
              :videoIndex="index"
              :ref="'myVideo'+index"
              @isPlays="isPlays"
              @playEnd="playEnd"
              @handBridgeCallhandler="handBridgeCallhandler"
              @exitPortrait="exitPortrait"
            >
            </myVideo> -->
        </div>
        <!-- 图片 -->
        <div class="c_img" @click="handShowImg(item.content,index)" :class="'delay' + index" v-if="item.type === 'image'">
          <img :src="item.content"/>
        </div>
        <!-- 文字 -->
        <div class="c_text" :class="'delay' + index"  v-if="item.type === 'text'">
          <div class="ctImg"></div>
          <div class="c_text-box">
            <p :ref="'mybox'+index" v-html="item.content">{{item.content}}</p>
          </div>
        </div>
        <div class="download-btn" v-if="userInfo.userRole > 0">
          <span @click="copyText(item,index)" v-if="item.type === 'text'">复制</span>
          <span @click="handBridgeCallhandler({type:'download',resourceType:item.type,url:item.download,width:item.width,height:item.height})" v-else>下载</span>
        </div>
      </div>
    </div>
    <!-- <div class="all-down" @click="handBridgeCallhandler({type:'allDownload',url:allDown()})" v-if="userInfo.userRole > 1">
      <span>一键下载</span>
    </div> -->

    <!-- 点击显示大图轮播 -->
    <van-image-preview v-model="isShowImg"
      :images="images"
      :start-position="current"
      @close="onClose"
      @change="onChange"
    >
      <template v-slot:index>{{ (index+1) }}/{{images.length}}</template>
    </van-image-preview>

    <!-- 竖屏视频播放 -->
    <template>
      <div class="horizontalVideoBox" v-show="isShowHorizVideo">
      <!--  <verticalVideo
          :toPlays="toHoriPlay"
          :currentTime="currentTime"
          :videoW="videoWid"
          :videoH="videoHeg"
          :videoUrl="videoUrl"
          :videoImg="videoImg"
          :videoIndex="videoIndexs"
          @isPlays="isAdaptPlays"
          @childBridgeCallhandler="handBridgeCallhandler"
          @exitHorizontals="exitHorizontal"></verticalVideo> -->
      </div>
    </template>
  </div>
</template>
<script>
import Vue from 'vue';

// import myVideo from '@/components/videoDesc/video';
// import verticalVideo from '@/components/verticalVideo2/video';

// import adaptiveVideo from '@/components/adaptiveVideo/adaptiveVideo';

import { Toast } from 'vant';

Vue.use(Toast);
export default {
  components: {
    // myVideo,
    // verticalVideo
  },
  data() {
    return {
      isShowImg: false,
      images: [],
      current: 0,
      index: 0,
      userInfo: {
        userRole: -1
      },
      houseDesc: [],
      currentTime: 0,
      topVideoShow: [],
      isShowHorizVideo: false,
      toPlay: [],
      toHoriPlay: false,
      videoUrl: '',
      videoImg: '',
      videoIndexs: 0,
      videoWid: 0,
      videoHeg: 0
    };
  },
  props: {
    detailInfo: {
      type: Object,
      default: null
    },
    isLoadMove: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.userInfo = this.storage.get('userInfo');
    this.houseDescImg();
  },
  methods: {
    closePreImg() {
      this.isShowImg = false;
    },
    copyText(config, index) {
      const _reftext = 'mybox' + index;

      console.log(this.$refs[_reftext][0].innerText)
      console.log(this.$refs[_reftext][0].innerHTML)
      this.handBridgeCallhandler({ type: 'download', resourceType: config.type, url: this.$refs[_reftext][0].innerText });
    },
    // 全屏是否暂停
    isAdaptPlays(value) {
      this.toHoriPlay = value;
    },
    // 小屏是否暂停
    isPlays(value, index) {
      this.toPlay[index] = value;
    },
    handVideo(config, index) {
      this.videoUrl = config.content;
      this.videoImg = config.cover;
      this.videoIndexs = index;
    },
    // 点击进入全屏
    exitPortrait(currentTime, index) {
      this.currentTime = currentTime;
      this.isShowHorizVideo = true;
      this.storage.set('isHorz', true);
      if (this.Webkit.isApp()) this.handBridgeCallhandler({ type: 'openFlag', maxFlag: true });
      this.toPlay[index] = false;
      this.toHoriPlay = true;
    },
    // 退出全屏
    exitHorizontal(currentTime, index) {
      this.currentTime = currentTime;
      // this.toPlay[index] = this.toHoriPlay;
      // console.log(this.toPlay[index])
      this.videoPlay(index);
      this.toHoriPlay = false;
      this.storage.set('isHorz', false);
      this.isShowHorizVideo = false;
      if (this.Webkit.isApp()) this.handBridgeCallhandler({ type: 'closeFlag', maxFlag: false });
    },
    videoPlay(index) {
      this.toPlay[index] = true;
    },
    // 播放视频
    playVideo(config, index) {
      this.topVideoShow[index] = true;
      this.videoUrl = config.content;
      this.videoImg = config.cover;
      this.videoPlay(index);
    },
    playEnd(index) {
      // this.topVideoShow[index] = false;
    },
    houseDescImg() {
      if (this.detailInfo.length === 0) return;
      this.images = [];
      this.topVideoShow = [];
      this.toPlay = [];

      this.detailInfo.house_desc.forEach((item, index) => {
        this.topVideoShow.push(false);
        this.toPlay.push(false);
        if (item.type === 'image') {
          this.images.push(item.content);
        }
      });
      // return JSON.stringify(houseDesc);
      // alert(JSON.stringify(houseDesc))
    },
    // 点击查看图片大图
    handShowImg(imgs, index) {
      this.current = this.images.map(item => item).indexOf(imgs);
      this.isShowImg = true;
      window.H5CloseFlag = () => {
        this.closePreImg();
      };
      this.handBridgeCallhandler({ type: 'openFlag', maxFlag: true });
      // this.images.push(imgs);
    },
    // 关闭查看图片
    onClose() {
      this.handBridgeCallhandler({ type: 'closeFlag', maxFlag: false });
    },
    // 点击查看大图轮播
    onChange(index) {
      this.index = index;
    },
    // 调父组件方法
    handBridgeCallhandler(params) {
      this.$emit('bridgeCallhandler', params);
    }
  },
  watch: {
    isLoadMove(value) {
      console.log(value);
    }
  }
}
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
  /**房产介绍**/
  .propertyDescPanel{
      margin-top: 0.5rem;
      padding: 0.5rem 1rem 2rem 1rem;
      font-size: .95rem;
      position: relative;
      overflow: hidden;
      min-height: 5rem;
      .horizontalVideoBox{
        position: fixed;
        z-index: 3000;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .desc_list{
          display: flex;
          flex-direction: row;
          // margin-bottom: .5rem;
          .desc_head{
              width: 2.625rem;
              height: 2.625rem;
              display: inline-block;
              border-radius: 50%;
              overflow: hidden;
              img{
                height: 100%;
              }
          }
          .desc_cent{
              padding: .5rem .5rem;
              position: relative;
              display: flex;
              flex-direction: row;
              .c_video{
                  min-width: 12rem;
                  max-width: 12rem;
                  min-height: 9rem;
                  background-color: #000000;
                  // height: 10.625rem;
                  display: inline-block;
                  position: relative;
                  // overflow: hidden;
                  .playBox{
                    width: 100%;
                    height: 100%;
                    min-width: 12rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    z-index: 3000;
                    .playImg{
                      position: absolute;
                      width: 2rem;
                      height: 2rem;
                      left: 50%;
                      top:50%;
                      margin-top: -1rem;
                      margin-left: -1rem;
                      background: url('~./assets/images/propertyDetails/videoPlayBtn.png') no-repeat center;
                      background-size: 32px 32px;
                      z-index: 10;
                    }
                    img{
                      position: absolute;
                      top:0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .video-player{
                      width: 12rem;
                      // height: 10.625rem;
                      overflow: hidden;
                  }
              }
              .c_img{
                  max-width: 12rem;
              }
              .c_text{
                  position: relative;
                  .ctImg{
                      position: absolute;
                      width: 0.375rem;
                      height: 0.625rem;
                      left: -0.375rem;
                      top: 0.4375rem;
                      background: url('~./assets/images/propertyDetails/live_icon.png') no-repeat center;
                      background-size:  100% 100%;
                      transform: rotate(180deg);
                  }
                  &-box{
                      background-color: #ffffff;
                      max-width: 12rem;
                      border-radius: 0.3125rem;
                      padding: 0.9375rem;
                      font-size: 0.875rem;
                      color: #34343e;
                      line-height: 1.5rem;
                      word-wrap: break-word;
                      word-break: normal;
                  }
              }
              .download-btn{
                width: 2.75rem;
                height: 1.25rem;
                // line-height: 1.1rem;
                border-radius: 0.625rem;
                border: 1px solid #F95251;
                font-size: 0.75rem;
                color: #F95251;
                text-align: center;
                position: absolute;
                bottom: 1rem;
                right: -2.6rem;
                display: flex;
                align-items: center;
                justify-content: center;
                span{
                  margin-top: 0.1rem;
                }
              }

          }
      }
      .all-down{
        position: absolute;
        width: 3rem;
        height: 3rem;
        background: url('~./assets/images/propertyDetails/quiz-bg.png') no-repeat center;
        background-size: 3rem 3rem;
        bottom: .5rem;
        right: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        span{
          font-size: 0.65rem;
          color: #F95251;
          width: 1.5rem;
          display: inline-block;
          margin-left: -0.1rem;
        }
      }
  }
  /deep/ .vjs-big-play-button{
      width: 1.5em;
      height: 1.5em;
      line-height: 2.5rem;
      border-radius: 50%;
      left: 50%;
      margin-left: -.725em;
      top: 50%;
      margin-top: -.725em;
  }
  /deep/ .video-js{
    height: 100%;
  }
</style>
