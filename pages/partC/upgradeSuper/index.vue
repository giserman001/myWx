<template>
  <div class="upgrade-super">
    <div class="upgrade-super-right">
      <img src="../assets/super-right.png" alt />
    </div>
    <div class="upgrade-super-guide">
      <h3>超级会员升级方式</h3>
      <p>以下条件满足任意一条即可</p>
      <ul class="methods">
        <li>
          <span class="text">1.发布10条原创资讯文章升级</span>
          <span class="button" @click="noticeVisible=true">前往App操作</span>
        </li>
        <li>
          <span class="text">2.发布20条原创小视频升级</span>
          <span class="button" @click="noticeVisible=true">前往App操作</span>
        </li>
        <li>
          <span class="text">3.直属初级合伙人员手动升级设置</span>
          <span class="button">直接申请</span>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeVisible: false,
    };
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
</style>