<template>
  <div class="normal-member">
    <u-tabs
      :list="tabs"
      active-color="#F95050"
      :is-scroll="false"
      :current="current"
      @change="onTabChange"
    ></u-tabs>
    <div v-if="current===0" class="member-direct">
      <ul class="member-list">
        <li v-for="member in list" :key="member.user_id">
          <div class="avatar">{{member.avatar}}</div>
          <span>{{member.nick_name}}</span>
        </li>
      </ul>
    </div>
    <div class="member-super" v-else>
      <ul v-if="superMember.length"></ul>
      <div v-else class="empty-member">
        <img src="../assets/empty-member.png" alt />
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>
<script>
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
    },
    initTabs() {
      const url = "/union/distribute/subMenu/";

      this.menuSub = [
        {
          menu_type: "string",
          menu_name: "我的注册会员",
          is_active: 1,
        },
        {
          menu_type: "string",
          menu_name: "我的超级会员",
          is_active: 1,
        },
      ];
    },
    initInvitedMembers() {
      const result = {
        status: 0,
        msg: "string",
        data: {
          pager: {
            count: 0,
            pagesize: 0,
            pagecount: 0,
            page: 0,
          },
          list: [
            {
              user_id: 0,
              nick_name: "nick1",
              avatar: "string",
            },
            {
              user_id: 1,
              nick_name: "nick2",
              avatar: "string",
            },
          ],
        },
      };
      this.list = result.data.list;
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