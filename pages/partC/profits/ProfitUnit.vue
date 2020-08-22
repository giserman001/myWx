<template>
  <div class="profit-unit" @click="$emit('click')">
    <span>{{name}}</span>
    <span v-if="type==='count'">{{value}}</span>
    <img v-else src="../assets/arrow-right.png" alt />
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    value: String,
    type: String,
  },
};
</script>
<style lang="scss" scoped>
.profit-unit {
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