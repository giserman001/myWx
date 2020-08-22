<template>
  <div class="active-point">
    <div class="active-point-30days">
      <PonitBar title="近30天活跃值" :count="recentPoints" />
    </div>
    <div class="active-point-mine">
      <PonitBar class="active-point-mine-first" title="自己推广所得" :count="myPonits" />
      <PonitBar title="我的超级会员推广所得" :count="subPoints" />
    </div>
    <div class="active-point-guide">
      <p class="tips">{{activeData.update_tip}}</p>
      <div v-html="activeData.rule_tip"></div>
    </div>
  </div>
</template>
<script>
import { getActivePoint, accessToken } from "../mock";
import PonitBar from "./PointBar";
export default {
  data() {
    return {
      activeData: {},
    };
  },
  computed: {
    recentPoints() {
      return this.activeData.active_points || 0;
    },
    myPonits() {
      return this.activeData.my_points || 0;
    },
    subPoints() {
      return this.activeData.sub_points || 0;
    },
  },
  mounted() {
    this.initActiveData();
  },
  components: {
    PonitBar,
  },
  methods: {
    async initActiveData() {
      const _this = this;
      this.$http.post(
        "/union/distribute/activePoints/",
        {
          access_token: accessToken,
        },
        function (res) {
          _this.activeData = res.data;
          console.log(res.data);
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.active-point {
  &-mine {
    margin-top: 10px;
    &-first {
      border-bottom: 1px solid #e9e9e9;
    }
  }
  &-guide {
    margin: 10px;
    padding: 15px;
    background: #fff;
    .tips {
      white-space: normal;
      font-size: 14px;
      font-weight: 500;
      color: rgba(249, 82, 81, 1);
      line-height: 20px;
    }
    > h3 {
      margin-top: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 20px;
    }
    > ul {
      list-style: decimal;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 20px;
      > li {
        margin-top: 10px;
      }
    }
  }
}
</style>