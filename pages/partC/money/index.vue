<template>
  <div class="money">
    <div class="money-header" @click="$emit('click')">
      <span>可提现金额： ￥{{0}}</span>
      <div>
        <span>前往app提现</span>
        <img src="../assets/arrow-right.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import { accessToken } from "../mock";
export default {
  mounted() {
    this.$http.post(
      "​/union​/distribute​/withdrawHome​/",
      { access_token: accessToken },
      function (res) {
        console.log(res);
      }
    );
  },
};
</script>
<style lang="scss" scoped>
.money-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  line-height: 50px;
  border-bottom: 1px solid #e9e9e9;
  background: #fff;
  > span {
    font-size: 16px;
    &:nth-child(1) {
      color: #000;
    }
    &:nth-child(2) {
      color: #f95251;
    }
  }
  > img {
    width: 14px;
    height: 14px;
  }
}
</style>