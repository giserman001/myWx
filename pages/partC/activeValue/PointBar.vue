<template>
  <div class="point-bar">
    <span class="title">{{title}}</span>
    <span class="count">{{count}}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    count: Number,
  },
};
</script>

<style lang="scss" scoped>
.point-bar {
  background: #fff;
  line-height: 52px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    font-size: 16px;
    &:nth-child(1) {
      color: #000;
    }
    &:nth-child(2) {
      color: #4d4d4d;
    }
  }
}
</style>