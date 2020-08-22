<template>
  <div class="member-title" @click="$emit('click')">
    <h3>{{title}}</h3>
    <img src="./assets/arrow-right.png" alt />
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  },
};
</script>
<style lang="scss" scoped>
.member-title {
  margin: 0 15px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > h3 {
    font-size: 14px;
  }
  > img {
    width: 14px;
    height: 14px;
  }
}
</style>