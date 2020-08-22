<template>
  <div class="normal-member">
    <u-tabs
      :list="tabs"
      active-color="#F95050"
      :is-scroll="false"
      :current="current"
      @change="onTabChange"
    ></u-tabs>
    <div class="member-direct">
      <ul v-if="list && !!list.length" class="member-list">
        <li v-for="member in list" :key="member.user_id">
          <div class="avatar">{{member.avatar}}</div>
          <span>{{member.nick_name}}</span>
        </li>
      </ul>
      <div v-else class="empty-member">
        <img src="../assets/empty-member.png" alt />
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>
<script>
import { accessToken } from "../mock";
export default {
  data() {
    return {
      menuSub: [],
      current: 0,
      list: [],
      superMember: [],
    };
  },
  computed: {
    tabs() {
      return this.menuSub
        .filter((v) => !!v.is_active)
        .map((v) => ({
          name: v.menu_name,
        }));
    },
  },
  methods: {
    onTabChange(index) {
      this.current = index;
      this.initInvitedMembers();
    },
    initTabs() {
      this.menuSub = [
        {
          menu_type: "sub",
          menu_name: "我的注册会员",
          is_active: 1,
        },
        {
          menu_type: "team",
          menu_name: "我的超级会员",
          is_active: 1,
        },
      ];
    },
    initInvitedMembers(type) {
      const _this = this;
      this.$http.post(
        "/union/distribute/subMembers/",
        { access_token: accessToken, type: _this.menuSub[_this.current] },
        function (res) {
          _this.list = res.data.list;
          console.log("initInvitedMembers", res.data);
        }
      );
    },
  },
  created() {
    this.initTabs();
    this.initInvitedMembers();
  },
};
</script>
<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.member-list {
  > li {
    padding: 0 15px;
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #ececec;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #000;
      margin-right: 10px;
    }
    > span {
      color: rgba(54, 54, 69, 1);
      font-size: 16px;
    }
  }
}

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