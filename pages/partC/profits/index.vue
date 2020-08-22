<template>
  <div class="profits">
    <u-tabs
      :list="tabs"
      active-color="#F95050"
      :is-scroll="false"
      :current="current"
      @change="onTabChange"
    ></u-tabs>
    <div class="profits-base">
      <ProfitUnit type="count" :name="'本月预估总收益'" value="¥3.45" />
      <ProfitUnit type="count" :name="'本月预估推广收益'" value="¥3.45" />
      <ProfitUnit type="count" :name="'本月预估返利收益'" value="¥3.45" />
      <ProfitUnit type="count" :name="'本月预估平台奖励'" value="¥3.45" />
    </div>

    <div class="profits-all">
      <ProfitUnit @click="modalVisible=true" :name="'我的总收益详情'" />
      <ProfitUnit @click="modalVisible=true" :name="'我的推广收益详情'" />
      <ProfitUnit @click="modalVisible=true" :name="'我的平台奖励详情'" />
    </div>
    <div class="profits-next">
      <ProfitUnit type="count" :name="'本月预估结算金额'" value="¥3.45" />
      <ProfitUnit type="count" :name="'下月预估结算金额'" value="¥3.45" />
    </div>

    <u-modal
      :show-cancel-button="true"
      @confirm="onConfirm"
      v-model="modalVisible"
      :content="content"
    ></u-modal>
  </div>
</template>
<script>
import ProfitUnit from "./ProfitUnit";
import { accessToken } from "../mock";
export default {
  data() {
    return {
      tabs: [
        {
          name: "本月预估",
        },
        {
          name: "上月预估",
        },
        {
          name: "近30天预估",
        },
      ],
      content: "请前往嗨生活App查看详细收益信息",
      modalVisible: false,
      current: 0,
      profitData: {},
      dataTypes: ["this", "prev", "30days"],
    };
  },
  components: {
    ProfitUnit,
  },
  created() {
    this.initProfitData();
  },
  methods: {
    onTabChange(index) {
      this.current = index;
    },
    initProfitData() {
      const _this = this;
      // this.$http.post(
      //   "/union/distribute/profitSummary/",
      //   { access_token: accessToken, data_type: "30days" },
      //   function (res) {
      //     console.log(res);
      //   }
      // );
    },
    onConfirm() {
      console.log("confirm");
    },
  },
};
</script>
<style lang="scss" scoped>
.profits-base {
  margin-top: 5px;
}
.profits-all,
.profits-next {
  margin-top: 20px;
}
</style>