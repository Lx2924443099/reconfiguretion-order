<template>
  <div class="main">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="tabbar">
      <van-tabbar v-model="active">
        <van-tabbar-item name="home" replace to="/home" icon="wap-home-o"
          >主页</van-tabbar-item
        >
        <van-tabbar-item name="Order" replace to="/order" icon="balance-list-o"
          >订餐</van-tabbar-item
        >
        <van-tabbar-item name="Cart" replace to="/cart" icon="cart-o"
          >购物车</van-tabbar-item
        >
        <van-tabbar-item name="Mine" replace to="/mine" icon="manager-o"
          >我的</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: this.$route.name,
    };
  },
  watch: {
    $route: {
      handler() {
        this.active = this.$route.name;
      },
    },
  },
};
</script>

<style>
</style>