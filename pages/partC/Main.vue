<template>
  <div class="member-main">
    <!-- 头部信息 -->
    <div class="member-main-header">
      <div class="header-user">
        <div class="header-avator">
          <!-- <img src alt /> -->
        </div>
        <div class="header-info">
          <h3>{{memberInfo.nick_name}}</h3>
          <div class="member-level">
            <div class="level-vip">
              <img src="./assets/vip.png" alt />
              <span>{{memberInfo.role_name}}</span>
            </div>
          </div>
          <div class="member-invite">
            <span>{{memberInfo.share_code}}</span>
            <span>复制邀请码</span>
          </div>
        </div>
      </div>
      <div v-if="memberInfo.user_role === 'super'" class="header-activevalue">
        <div class="activevalue-title">
          <span>近30天的活跃值</span>
          <div @click="enterActivePage">
            <span>活跃值</span>
            <img src="./assets/arrow-raight-small.png" alt />
          </div>
        </div>
        <u-line-progress
          inactive-color="#C0832F"
          active-color="#FFE4AA"
          :percent="memberInfo.active_points/memberInfo.max_points"
          :height="5"
        ></u-line-progress>
        <div class="activevalue-number">
          <span>{{memberInfo.active_points}}</span>
          <span>{{memberInfo.max_points}}</span>
        </div>
      </div>
    </div>
    <!-- 收益提现 -->
    <div @click="enterMoney" class="member-main-money">
      <div class="money-content">
        <span>收益提现</span>
        <!-- <span>@click="$router.push('/pages/partC/activeValue/index')"</span> -->
        <img src="./assets/arrow-right.png" alt />
      </div>
    </div>
    <!-- 我的会员 -->
    <div class="member-main-info member-super">
      <MemberTitle title="我的会员" @click="enterMemberPage" />
      <div class="info-content">
        <div v-for="member in memberInfo.member" :key="member.menu_type" class="info-content-row">
          <h3>{{member.count}}人</h3>
          <span>{{member.menu_name}}</span>
        </div>
      </div>
    </div>
    <!-- 升级会员 -->
    <div
      v-if="memberInfo.upgrade_tip"
      @click="upgradeMember"
      class="member-main-upgrade"
    >{{memberInfo.upgrade_tip}}</div>
    <!-- 我的收益 -->
    <div class="member-main-profit member-normal">
      <MemberTitle @click="enterProfit" title="预估收益" />
      <div class="info-content">
        <div v-for="profit in memberInfo.profit" :key="profit.menu_name" class="info-content-row">
          <h3>￥{{profit.amount}}</h3>
          <span>{{profit.menu_name}}</span>
        </div>
      </div>
    </div>
    <!-- 订单 -->
    <div class="member-main-order">
      <MemberTitle @click="enterOrderPage" title="我的订单" />
      <div class="info-content">
        <div v-for="order in memberInfo.order" :key="order.menu_name" class="info-content-row">
          <h3>{{order.count}}人</h3>
          <span>{{order.menu_name}}</span>
        </div>
      </div>
    </div>
    <!-- 升级成长攻略 -->
    <div @click="enterUpgradeGuidePage" class="member-main-other member-main-strategy">
      <h3>升级成长攻略</h3>
      <img src="./assets/arrow-right.png" alt />
    </div>
    <!-- 收益流程 -->
    <div @click="enterProcessPage" class="member-main-other member-main-process">
      <h3>收益流程</h3>
      <img src="./assets/arrow-right.png" alt />
    </div>
    <!-- 会员通讯录 -->
    <div @click="enterAddressBookPage" class="member-main-other member-main-addressbook">
      <h3>会员通讯录</h3>
      <img src="./assets/arrow-right.png" alt />
    </div>
    <div class="member-main-mask" v-if="loadingVisible" @click="loadingVisible = false">
      <u-loading mode="circle"></u-loading>
    </div>
  </div>
</template>
<script>
import { getMemberInfo, accessToken } from "./mock.js";
import MemberTitle from "./MemberTitle";

export const jump = (url) =>
  wx.navigateTo({
    url,
  });
const memberType = {
  normal: "NORMAL",
  surper: "SURPER",
  company: "company",
  regiester: "REGIESTER",
};
export default {
  data() {
    return {
      memberInfo: {
        member: [],
        order: [],
        profit: [],
      },
      loadingVisible: false,
      memberType,
    };
  },
  components: {
    MemberTitle,
  },
  computed: {
    myRegiesterCount() {
      return 0;
    },
    teamMemberCount() {
      return 0;
    },
    nickName() {
      return "这是昵称";
    },
    vipType() {
      return memberType.super;
    },

    inviteCode() {
      return "THvbs5";
    },

    upgradeText() {
      switch (this.vipType) {
        case memberType.normal:
          return "升级超级会员,马上解锁九大权益";
        case memberType.super:
          return "升级初级合伙人赚更多！";
        default:
          return "";
      }
    },
  },
  mounted() {
    const _this = this;
    this.initMember();
  },
  methods: {
    async initMember() {
      this.loadingVisible = true;
      const _this = this;
      this.$http.post(
        "/union/distribute/memberInfo/",
        { access_token: accessToken },
        function (res) {
          _this.memberInfo = res.data;
          console.log(res);
          _this.loadingVisible = false;
        }
      );
    },
    enterActivePage() {
      jump("/pages/partC/activeValue/index");
    },
    enterMemberPage() {
      jump("/pages/partC/members/index");
      // switch (this.vipType) {
      //   case this.memberType.normal:
      //     jump("/pages/partC/normalMember/index");
      //     break;
      //   case this.memberType.super:
      //     break;
      //     jump("/pages/partC/superMember/index");
      //   case this.memberType.company:
      //     jump("/pages/partC/company/index");
      //     break;
      //}
    },
    enterOrderPage() {
      jump("/pages/partC/order/index");
    },
    enterProfit() {
      jump("/pages/partC/profits/index");
    },
    enterMoney() {
      jump("/pages/partC/money/index");
    },
    enterUpgradeGuidePage() {
      jump("/pages/partC/upgradeGuide/index");
    },
    enterProcessPage() {
      jump("/pages/partC/process/index");
    },
    enterAddressBookPage() {
      jump("/pages/partC/addressBook/index");
    },
    upgradeMember() {
      jump("/pages/partC/upgradeRegiester/index");
      // switch (this.vipType) {
      //   case memberType.normal:
      //     jump("/pages/partC/upgradeRegiester/index");
      //     break;
      //   case memberType.regiester:
      //     jump("/pages/partC/upgradeSuper/index");
      //     break;
      //   case memberType.super:
      //     jump("/pages/partC/upgradeCompany/index");
      //     break;
      //  }
    },
  },
};
</script>
<style lang="scss" scoped>
.member-main {
  padding-bottom: 40px;
  &-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-header {
    padding: 12px 20px 39px;
    .header-user {
      display: flex;
    }

    box-sizing: border-box;
    background: linear-gradient(
      153deg,
      rgba(234, 214, 159, 1) 0%,
      rgba(204, 146, 72, 1) 100%
    );
    .header-activevalue {
      .activevalue-title,
      .activevalue-number {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color: #fff;
        align-content: center;
        line-height: 16px;
        img {
          width: 12px;
          height: 12px;
        }
      }
      .activevalue-title {
        margin-top: 12px;
      }
    }
    .header-avator {
      width: 80px;
      height: 80px;
      margin-right: 18px;
      background: #000;
      border-radius: 50%;
    }
    .header-info {
      > h3 {
        max-width: 240px;
        font-size: 16px;
        line-height: 22px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .member-level {
        margin-top: 6px;

        .level-vip {
          padding: 6px;
          display: flex;
          align-items: center;
          line-height: 22px;
          color: #fff;
          border-radius: 4px;
          background: linear-gradient(
            153deg,
            rgba(96, 76, 29, 1) 0%,
            rgba(46, 46, 46, 1) 100%
          );
          > img {
            width: 18px;
            height: 18px;
            margin-right: 6px;
          }
        }
      }
      .member-invite {
        margin-top: 6px;
        background: url("./assets/invite-bg.png") no-repeat 100%/100%;
        width: 128px;
        display: flex;
        justify-content: space-between;
        > span {
          font-size: 12px;
          &:nth-child(1) {
            color: #fff;
            margin-left: 6px;
          }
          &:nth-child(2) {
            color: #5d3500;
            margin-right: 6px;
          }
        }
      }
    }
  }
  &-money {
    .money-content {
      margin: -22px 10px 0;
      padding: 0 15px;
      background: #fff;
      border-radius: 7px;
      line-height: 44px;
      align-items: center;
      display: flex;
      justify-content: space-between;
      > img {
        height: 14px;
        width: 14px;
      }
    }
  }
  &-info,
  &-order,
  &-profit {
    margin-top: 15px;
    .info-content {
      margin: 10px 10px 0;
      padding: 18px 0;
      display: flex;
      background: #fff;
      &-row {
        flex: 1;
        text-align: center;
        > h3 {
          font-size: 14px;
          line-height: 20px;
        }
        > span {
          display: block;
          padding-top: 10px;
          color: #8f8f8f;
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
  }
  &-upgrade {
    margin: 15px 15px 0;
    height: 45px;
    background: linear-gradient(
      90deg,
      rgba(231, 188, 121, 1) 0%,
      rgba(246, 219, 150, 1) 100%
    );
    border-radius: 31px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(118, 72, 0, 1);
    line-height: 45px;
    text-align: center;
  }
  &-profit {
    margin-top: 15px;
  }
  &-order {
    margin-top: 15px;
  }
  &-other {
    margin: 10px 10px 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 44px;
    padding: 0 15px;
    > img {
      width: 14px;
      height: 14px;
    }
    > h3 {
      font-size: 14px;
      font-weight: normal;
    }
  }
}
</style>

