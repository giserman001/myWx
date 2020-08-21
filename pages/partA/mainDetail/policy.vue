<template>
  <div class="policyMain">
    <activityHead :headText="'金融支持政策'"></activityHead>
    <div class="policyConent" v-if="list.house_policy" v-html="list.house_policy.content">
      {{ list.house_policy.content }}
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import activityHead from '@/components/activityHead/activityHead';
import propertyDetails from '@/services/api/propertyDetails';

import { Toast } from 'vant';
Vue.use(Toast);
export default {
  components: {
    activityHead
  },
  data() {
    return {
      list: {},
      paramsConfig: {}
    };
  },
  mounted() {
    // 拿到链接上获取到存储的配置
    const paramsConfig = this.storage.get('estate_config');

    if (paramsConfig) {
      this.paramsConfig = paramsConfig;
      this.getHouseDetail();
    }
  },
  methods: {
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
        this.list = data.data;
      } else {
        Toast(data.msg);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.policyMain{
  padding-top: 4.5rem;
  .policyConent{
    padding: 20px;
    font-size:16px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,1);
    line-height:28px;
  }
}
</style>
