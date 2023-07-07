<template>
  <div class="mine">
    <img class="userInfo" src="../assets/image/indexImg/userlogo.png" alt="" />
    <p>{{ name }}</p>
    <div class="bottom">
      <van-cell title="我的地址" is-link to="/selectAddress" />
      <van-cell title="联系我们" is-link @click="linkUs" />
      <van-cell title="退出登录" is-link @click="exitLogin"/>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    linkUs() {
      alert("我叫卢小志你记住，南昌双港东大街，打听打听谁是爹！");
    },
    exitLogin() {
      Dialog.confirm({
        title: "退出",
        message: "确定要退出登录吗？",
      })
        .then(() => {
          this.exit();
          this.$router.push('/home')
        })
        .catch(() => {
          
        });
    },
    ...mapMutations(["exit"]),
  },
  created() {
    if (this.$store.state.name) {
      this.name = this.$store.state.name;
    } else {
      this.name = "用户";
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.userInfo {
  width: 120px;
  height: 120px;
  margin-left: 110px;
  margin-top: 120px;
}
p {
  font-size: 20px;
  width: 100%;
  text-align: center;
}
</style>