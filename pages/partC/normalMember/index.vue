<template>
  <div class="normal-member">
    <u-tabs :list="tabs" :is-scroll="false" :current="current" @change="onTabChange"></u-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "我的注册会员",
        },
        {
          name: "我的超级会员",
        },
      ],
      current: 0,
    };
  },
  methods: {
    onTabChange(index) {
      this.current = index;
    },
  },
};
</script>