<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="返回"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-form @submit="onSubmit" style="margin-top: 75px">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        style="margin-bottom: 15px"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
import { Dialog } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.username.trim() && this.password.trim()) {
        axios
          .get("http://localhost:3000/users", {
            params: {
              username: this.username,
              password: this.password,
            },
          })
          .then((data) => {
            if (data.data.length) {
              let userInfo={
                name:data.data[0].name,
                username:data.data[0].username
              }
              this.login(userInfo);
              this.$router.push("/home");
            } else {
              Dialog.alert({
                message: "登录失败，请检查账号密码！",
              });
            }
          });
      }else{
        Dialog.alert({
                message: "账号密码不能为空！",
              });
      }
    },
    ...mapMutations(["login"]),
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight(){
        this.$router.push("/register")
    }
  },
};
</script>

<style>
</style>