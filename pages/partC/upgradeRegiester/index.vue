<template>
  <div class="upgrade-super">
    <div class="upgrade-super-right">
      <img src="../assets/regiester-right.png" alt />
    </div>
    <div class="upgrade-super-guide">
      <h3>注册会员升级方式</h3>
      <p>以下条件满足任意一条即可</p>
      <ul class="methods">
        <li>
          <span class="text">1.输入邀请码即可快速升级</span>
          <span class="button" @click="inviteCodeVisible=true">输入邀请码</span>
        </li>
        <li>
          <span class="text">2.发布3条原创资讯文章升级</span>
          <span class="button" @click="noticeVisible=true">前往App操作</span>
        </li>
        <li>
          <span class="text">3.发布5条原创小视频升级</span>
          <span class="button" @click="noticeVisible=true">前往App操作</span>
        </li>
      </ul>
    </div>
    <u-modal
      :content="'请下载并打开嗨生活App操作进行相应操作升级成为超级会员'"
      v-model="noticeVisible"
      :show-cancel-button="false"
      :show-title="false"
      :confirm-text="'知道了'"
    ></u-modal>

    <u-modal
      @comfirm="onConfirmCode"
      :show-cancel-button="true"
      v-model="inviteCodeVisible"
      title="输入邀请码"
    >
      <view class="slot-content">
        <input v-model="inviteCode" placeholder="请输入会员邀请码" class="invite-code-input" type="text" />
        <text class="invite-code-text">没有邀请码？</text>
      </view>
    </u-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeVisible: false,
      inviteCodeVisible: false,
      inviteCode: "",
    };
  },
  methods: {
    onConfirmCode() {},
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
.upgrade-super {
  width: 100%;
  &-right {
    width: 100%;
    > img {
      width: 100%;

      height: auto;
    }
  }
  &-guide {
    margin-top: 8px;
    background: #fff;
    padding-top: 20px;
    padding-bottom: 50px;
    > h3 {
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 25px;
    }
    > p {
      margin-top: 9px;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: rgba(143, 143, 143, 1);
      line-height: 16px;
    }
    > ul {
      > li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 15px;
        border-bottom: 1px solid #ececec;
        &:nth-last-child(1) {
          border-bottom: none;
        }
        .text {
          line-height: 74px;
        }
        .button {
          height: 28px;
          box-sizing: border-box;
          padding: 6px 10px;
          line-height: 16px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(210, 158, 74, 1);
          text-align: center;
          border: 1px solid rgba(210, 158, 74, 1);
          border-radius: 15px;
        }
      }
    }
  }
}
.invite-code-input {
  margin: 12px 20px 0;
  background: rgba(239, 239, 239, 1);
  display: block;
  line-height: 38px;
  height: 38px;
  text-indent: 10px;
}
.invite-code-text {
  margin: 18px 0 12px;
  display: block;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: rgba(95, 149, 242, 1);
  line-height: 18px;
}
</style>