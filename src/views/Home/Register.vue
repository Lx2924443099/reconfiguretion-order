<template>
  <div class="register">
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit" style="margin-top: 75px">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        style="margin-bottom: 15px"
        readonly
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        style="margin-bottom: 15px"
        required
      />
      <van-field
        v-model="name"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        required
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog } from "vant";
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "",
      username: Math.floor(Math.random() * 10000000000),
      password: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.username.trim() && this.password.trim() && this.name.trim()) {
        let newUser = {
          name: this.name,
          username: this.username,
          password: this.password,
        };
        axios
          .post("http://localhost:3000/users", newUser)
          .then(() => {
            Dialog.alert({
              message: "注册成功！",
            }).then(() => {
              this.login(this.name);
              this.$router.push("/home");
            });
          })
          .catch(() => {
            Dialog.alert({
              message: "注册失败！",
            });
          });
      } else {
        Dialog.alert({
          message: "注册失败，请检查输入！",
        });
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    ...mapMutations(["login"]),
  },
};
</script>

<style>
</style>