<template>
  <div class="child_group">
    <div class="g-left">
      <p class="l_title">{{detailInfo.house_group.title}}</p>
      <p class="l_subtitle">{{detailInfo.house_group.subtitle}}</p>
    </div>
    <div class="g-right">
      <p class="r_img" v-if="detailInfo.house_group.status != 1" @click="handGotoSign(detailInfo.id)">
        <span class="g_span">立即<br/>加入</span>
      </p>
       <p class="r_img" v-if="detailInfo.house_group.status == 1" :class="{'shImg':detailInfo.house_group.status == 1}">
        <span class="g_span">审核中</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paramsConfig: {}
    };
  },
  props: {
    detailInfo: {
      type: Object,
      default: null
    }
  },
  mounted() {
    // 拿到链接上获取到存储的配置
    this.paramsConfig = this.storage.get('estate_config');
  },
  methods: {
    handGotoSign(id) {
      if (this.Webkit.isApp() || this.Webkit.isDebug()) {
        this.$router.push({
          name: 'groupSign',
          query: {
            house_id: id,
            access_token: this.paramsConfig.access_token
          }
        });
      } else {
        this.handBridgeCallhandler();
      }
    },
    // 调原生方法
    handBridgeCallhandler(params) {
      this.$emit('handBridgeCallhandler', params);
    }
  }
}
</script>
<style lang="less" scoped>
.child_group{
    position: relative;
    margin-top: .5rem;
    background:linear-gradient(90deg,rgba(242,247,255,1) 0%,rgba(222,236,255,1) 100%);
    padding: .8rem 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    .g-left{
        width: 85%;
        line-height: 1.6rem;
        .l_title{
            color: #32323C;
            font-weight: bold;
            font-size:.95rem;
            letter-spacing: 0;
        }
        .l_subtitle{
            margin-top: .2rem;
            font-size:.7rem;
            color: #5C5C6C;
            line-height: 0.9rem;
        }
    }
    .g-right{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        right: .5rem;
        height: 100%;
        .r_img{
            width: 42px;
            height: 42px;
            margin-left: 1rem;
            border-radius: 50%;
            line-height: 42px;
            font-size: 10px;
            background:#5f95f2;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            .g_span{
              display: inline-block;
              // max-width: 1.7rem;
              font-weight: bold;
              line-height: 15px;
              font-size: 10px;
              // width: 100%;
              // height: 100%;
              // font-size: 10px;
              // border-radius: 50%;
              // background:#5f95f2;
            }
        }
        .shImg{
          background:#FFFFFF;
          color: #5f95f2;
          .g_span{
            max-width: 100%;
            font-weight: bold;
          }
        }
    }
}
</style>
