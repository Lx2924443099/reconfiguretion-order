<template>
  <div class="Home">
    <div class="top">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(img, index) in imgList" :key="index">
          <img :src="img" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="middle">
      <van-row>
        <van-col span="6">
          <img src="../assets/image/indexImg/userlogo.png" alt="" />
        </van-col>
        <van-col span="12"><p>欢迎 {{ name }}</p></van-col>
          <van-col span="6" v-show="name==='用户'"><van-button type="info" @click="login">登录</van-button></van-col>
      </van-row>
    </div>
    <div class="bottom">
      <van-grid :gutter="10" :column-num="2" style="padding-left: 5px">
        <van-grid-item @click="selectAddress">
          <span>外卖到家</span>
          <img src="../assets/image/indexImg/delivery.jpg" alt="" />
        </van-grid-item>
        <van-grid-item @click="$router.push('./order')">
          <span>到店自取</span>
          <img src="../assets/image/indexImg/comeshop.jpg" />
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      imgList: [
        require("../assets/image/indexImg/1.jpeg"),
        require("../assets/image/indexImg/2.jpeg"),
        require("../assets/image/indexImg/3.jpeg"),
        require("../assets/image/indexImg/4.jpeg"),
      ],
    };
  },
  methods:{
    login(){
        this.$router.push("/login")
    },
    selectAddress(){
      this.$router.push("/selectAddress")
    }
  },
  computed:{
    ...mapState(["name"])
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.my-swipe {
  position: relative;
  z-index: 1;
  height: 300px;
  width: 100%;
  .van-swipe-item {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.middle {
  .van-row {
    position: relative;
    z-index: 2;
    width: 94%;
    height: 100px;
    margin: auto;
    margin-top: -35px;
    background-color: rgb(240, 255, 255);
    border-radius: 20px;
    .van-col {
      height: 100%;
      img {
        height: 100%;
      }
      p {
        width: 100%;
        height: 100%;
        font-size: large;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
      }
      .van-button {
        margin-top: 28px;
        font-weight: bold;
        color: black;
      }
    }
  }
}

.bottom {
  margin-top: 30px;
  .van-grid {
    .van-grid-item {
      width: 50%;
      height: 160px;
      img {
        width: 70%;
        height: 70%;
      }
      span {
        font-size: 15px;
      }
    }
  }
}
</style>