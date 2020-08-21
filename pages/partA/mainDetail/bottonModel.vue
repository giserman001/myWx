<template>
  <div class="bottonModel">
    <div class="iconPanel">
      <div class="evaluation" @click="handBridgeCallhandler({type:'pingjia',house_id:house_id})">
        <p class="e-icon"><img v-lazy="require('./assets/images/propertyDetails/evalIcon.png')"></p>
        <p class="e-text">评价</p>
      </div>
      <div class="creatPoster" v-if="userRole > 0" @click="handBridgeCallhandler({type:'schb',house_id:house_id,posters:detailInfo.house_pic})">
        <p class="c-icon"><img v-lazy="require('./assets/images/propertyDetails/crthb.png')"></p>
        <p class="c-text">生成海报</p>
      </div>
    </div>
     <div class="advisory onlineAdvisory onlineAdvisoryOff" v-if="detailInfo.seller_id === userInfo.id">
      <p class="advisory-title">在线咨询</p>
      <p class="advisory-desc">{{detailInfo.house_consult.tip}}</p>
    </div>
    <div class="advisory onlineAdvisory" v-else @click="handBridgeCallhandler({type:'zygw',seller_id:detailInfo.seller_id})">
      <p class="advisory-title">在线咨询</p>
      <p class="advisory-desc">{{detailInfo.house_consult.tip}}</p>
    </div>
    <div class="advisory phoneAdvisory" @click="handBridgeCallhandler({type:'callphone',phone:detailInfo.house_consult.tel})">
      <p class="advisory-title">电话咨询</p>
      <p class="advisory-desc">保护你的真实号码</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      house_id: this.storage.get('estate_config').house_id,
      userInfo: {
        userRole: -1
      }
    };
  },
  props: {
    detailInfo: {
      type: Object,
      default: null
    },
    userRole: {
      type: Number,
      default: -1
    }
  },
  mounted() {
    this.userInfo = this.storage.get('userInfo');
  },
  methods: {
    handBridgeCallhandler(params) {
      this.$emit('bridgeCallhandler', params);
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
/**底部**/
.bottonModel{
    background-color: #ffffff;
    padding: .5rem 1rem;
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    .iconPanel{
        display: flex;
        flex-direction: row;
        // justify-content: center;
        min-width: 6rem;
        .evaluation{
            width: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .e-icon{
                width: 1.375rem;
                height: 1.375rem;
            }
            .e-text{
                font-size:0.625rem;
                font-weight:400;
                color:#6A6A6A;
                line-height:1rem;
            }
        }
        .creatPoster{
            width: 4rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .c-icon{
                width: 1.375rem;
                height: 1.375rem;
            }
            .c-text{
                font-size:0.625rem;
                font-weight:400;
                color:#6A6A6A;
                line-height:1rem;
            }
        }
    }
    .advisory{
        width:108px;
        height:44px;
        font-size:12px;
        border-radius:4px;
        color:#ffffff;
        font-weight:500;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1.1rem;
        &-desc{
            font-size:0.625rem;
            font-weight:400;
        }
    }
    .onlineAdvisory{
        background:#F4A144;
        margin-left: 1.3rem;
    }
    .onlineAdvisoryOff{
        background:#d0d0d0;
    }
    .phoneAdvisory{
        background:#5F95F2;
        margin-left: 0.5rem;
    }
}
</style>
