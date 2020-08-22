<template>
  <div class="order">
    <div class="empty-member">
      <img src="../assets/empty-member.png" alt />
      <p>暂无数据</p>
    </div>
  </div>
</template>
<script>
import { accessToken } from "../mock";
export default {
  mounted() {
    this.$http.post(
      "​/union​/mall-order​/list​/",
      { access_token: accessToken },
      function (res, err) {
        console.log("initOrderData", res.data);
      }
    );
  },
  methods: {
    initOrderData() {
      console.log("initOrderData");
      const _this = this;
      this.$http.post(
        "​/union​/mall-order​/list​/",
        { access_token: accessToken },
        function (res) {
          console.log("initOrderData", res.data);
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.empty-member {
  padding-top: 110px;
  text-align: center;
  > img {
    width: 238px;
    height: 126px;
  }
  > p {
    margin-top: 26px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: rgba(143, 143, 143, 1);
  }
}
</style>